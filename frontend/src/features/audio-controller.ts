import * as Tone from 'tone';
import { psudorandomGeneratorFromString } from './SeededPsudoRandomGenerator';

const CONSTRUCTING = "constructing";
const LOADING = "loading";
const LOADED = "loaded";
const RUNNING = "running";

function sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}

let currentSong: Song | null = null;
let songState: "running" | "loaded" | "loading" | "constructing" | null = null; 

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

export function startSong() {
    if (currentSong !== null && songState === "loaded") {
        currentSong.play();
        songState = RUNNING;
    }
}

export function clearSong() {
    let returnPromise = Promise.resolve();
    if (currentSong !== null && songState === "running") {
        // We must not await the dispose promise before clearing songState,
        // as doing so allows songState to be set to null while another song is being initialised. 
        returnPromise = currentSong.dispose();
        currentSong = null;
        songState = null;
    }
    return returnPromise;
}

class Song {
    wordNotes: { sound: Tone.Sampler, word: string, duration: number }[];
    backingTrack: Tone.Player;
    loaded = false;
    topic: string;

    constructor(words: { wordString: string; wordSound: AudioBuffer; }[], backingTrackUrl: string, topic: string) {
         this.wordNotes = 
            words.map((item) => {
              const audioBuffer = item.wordSound;
              return {
                sound: toSampler(audioBuffer),
                word: item.wordString,
                duration: audioBuffer.duration
              }
            });
            this.backingTrack = new Tone.Player({
                url: backingTrackUrl,
                volume: -13,
                fadeOut: 2
              }).toDestination();
        this.topic = topic;
    }
    
    async load() {
        await Tone.loaded();
        this.loaded = true;
    }

    play() {
        if (!this.loaded) {
            throw Error("Song must be loaded before playing");
        }

        const time = Tone.now();
  
        const random = psudorandomGeneratorFromString(this.topic);
        let timeAdd = 5;
        const spaceBetween = 0.01;
        const baseNote = 60;
        const cutBy = 0.2;
        const chanceOfPause = 0;
        const lengthOfPause = 1;
        for (let i = 0; i < this.wordNotes.length; i++) {
            const sampler = this.wordNotes[i].sound;
            const length = this.wordNotes[i].duration * (1 - cutBy);
            const deviateNoteBy = 2;
            const randomNoteChange = Math.floor(random() * deviateNoteBy * 2) - deviateNoteBy;
            const deviateTimeBy = 0.1;
            const randomTimeChange = random() * deviateTimeBy * 2 - deviateTimeBy;
            sampler.triggerAttackRelease([Tone.Midi(baseNote + randomNoteChange).toFrequency()], length + randomTimeChange, time + timeAdd);
        
            let pause = 0;
        
            if (random() <= chanceOfPause) {
                pause = lengthOfPause;
            }
        
            timeAdd += length + randomTimeChange + spaceBetween + pause;
        }

        this.backingTrack.start(time, 0, timeAdd + 3);
    }

    dispose(): Promise<void> {
        for (let i = 0; i < this.wordNotes.length; i++) {
            const sampler = this.wordNotes[i].sound;
            sampler.dispose();
          }
          this.backingTrack.stop(Tone.now());

          // Give time for the player to fade out.
          return sleep(1500);
    }
}

function toSampler(audioBuffer: AudioBuffer) {
    return new Tone.Sampler({
      urls: {
        "C4": audioBuffer,
      },
      release: 1
    }).toDestination();
  }