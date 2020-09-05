import * as Tone from 'tone';
import { psudorandomGeneratorFromString } from './SeededPsudoRandomGenerator';
import { Hertz } from 'tone/build/esm/core/type/Units';

const CONSTRUCTING = "constructing";
const LOADING = "loading";
const LOADED = "loaded";
const RUNNING = "running";
const DISPOSING = "disposing";

function sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}

let currentSong: Song | null = null;
let songState: "running" | "loaded" | "loading" | "constructing" | "disposing" | null = null; 

export async function initSong(words: { wordString: string; wordSound: ArrayBufferLike; }[], topic: string) {
    if (songState === null) {
        songState = CONSTRUCTING;
        const processedWords = await Promise.all(words.map(async (word) => {
            const {wordString, wordSound} = word;
            return {
                wordString,
                wordSound: await Tone.getContext().decodeAudioData(wordSound.slice(0))
            } 
        }));
        currentSong = new Song(processedWords, "/its-not-over-til-the-bossa-nova.mp3", topic)
        songState = LOADING;
        await currentSong.load();
        songState = LOADED;
    } else {
        throw new Error("Attempted to play song over already playing song.");
    }
}

export function stopSong() {
    let returnPromise = Promise.resolve();
    if (currentSong != null && songState === RUNNING) {
        returnPromise = currentSong.stop().then(() => {
            songState = LOADED;
        });
    }
    return returnPromise;
}

export function startSong() {
    if (currentSong !== null && songState === LOADED) {
        currentSong.play();
        songState = RUNNING;
    }
}

Tone.Transport.on("start", () => {
    console.log("Transport started");
});

Tone.Transport.on("stop", () => {
    console.log("Transport stopped");
});

Tone.Transport.on("pause", () => {
    console.log("Transport paused");
});

export async function clearSong() {
    if (currentSong !== null && songState === "running") {
        songState = DISPOSING;
        // We must not await the dispose promise before clearing songState,
        // as doing so allows songState to be set to null while another song is being initialised. 
        const thisSong = currentSong;
        await thisSong.stop();
        await thisSong.dispose();
        currentSong = null;
        songState = null;
    }
}

const spaceBetween = 0.01; // Space between two words
const baseNote = 60; // Default note to sing a word at
const deviateNoteBy = 2; // Randomly deviate note by this (in semitones?)
const cutBy = 0.2; // shorten each sample by (cut off the end)
const chanceOfPause = 0; // Chance of pausing afer saying a word
const lengthOfPause = 1; // How long to pause for.
const deviateTimeBy = 0.1; // Start saying a word this amount before or after expected (seconds)

interface InternalWordNotes {
    sampler: Tone.Sampler, 
    word: string, 
    originalDuration: number,
    duration: number,
    note: Hertz[],
    startTime: number
}

class Song {
    wordNotes: { 
        sampler: Tone.Sampler, 
        word: string, 
        originalDuration: number,
        duration: number,
        note: Hertz[],
        startTime: number
    }[];
    backingTrack: Tone.Player;
    loaded = false;
    topic: string;
    finishTime: number;
    fadeoutDuration = 2;
    fadeoutDurationMs = this.fadeoutDuration * 1000;
    
    constructor(words: { wordString: string; wordSound: AudioBuffer; }[], backingTrackUrl: string, topic: string) {
        this.topic = topic;
        const random = psudorandomGeneratorFromString(this.topic);

        this.backingTrack = new Tone.Player({
            url: backingTrackUrl,
            volume: -13,
            fadeOut: this.fadeoutDuration
            }).toDestination().sync();
        
        let timeAdd = 5;

        this.wordNotes = words.reduce<InternalWordNotes[]>((acc, item) => {
            const audioBuffer = item.wordSound;
              const sampler = toSampler(audioBuffer);
              const originalDuration = audioBuffer.duration;

              const randomTimeChange = random() * deviateTimeBy * 2 - deviateTimeBy;
              const duration = originalDuration * (1 - cutBy) + randomTimeChange;
              const randomNoteChange = Math.floor(random() * deviateNoteBy * 2) - deviateNoteBy;
              const note = [Tone.Midi(baseNote + randomNoteChange).toFrequency()];

              const processedWord = {
                sampler,
                word: item.wordString,
                originalDuration,
                duration,
                note,
                startTime: timeAdd
              }

              let pause = 0;
        
              if (random() <= chanceOfPause) {
                pause = lengthOfPause;
              }
            
              timeAdd += duration + spaceBetween + pause;

              return [...acc, processedWord];
        }, []);

        this.finishTime = timeAdd + this.fadeoutDuration;
        const time = 0;

        this.backingTrack.start(time, 0, this.finishTime);

        for (let i = 0; i < this.wordNotes.length; i++) {
            const sampler = this.wordNotes[i].sampler;
            sampler.triggerAttackRelease(
                this.wordNotes[i].note || 440,
                this.wordNotes[i].duration || 1, 
                (this.wordNotes[i].startTime || 0) + time
            );
        }
        
        Tone.Transport.loop = false;
        console.log("Song constructed");
    }
    
    async load() {
        await Tone.loaded();
        this.loaded = true;
        console.log("Song loaded");
    }

    play() {
        if (!this.loaded) {
            throw Error("Song must be loaded before playing");
        }

        Tone.Transport.start(Tone.now());
        console.log("Song playing");
    }

    stop() {
        console.log("Song stopping");
        const now = Tone.now();
        Tone.Transport.stop(now);
        return sleep(this.fadeoutDurationMs);
    }

    async dispose(): Promise<void> {
        console.log("Song disposing");
        Tone.Transport.cancel(0);
        for (let i = 0; i < this.wordNotes.length; i++) {
            const sampler = this.wordNotes[i].sampler;
            sampler.dispose();
        }
        this.backingTrack.dispose();

        console.log("Song disposed");
    }
}

function toSampler(audioBuffer: AudioBuffer) {
    return new Tone.Sampler({
      urls: {
        "C4": audioBuffer,
      },
      release: 1
    }).toDestination().sync();
  }