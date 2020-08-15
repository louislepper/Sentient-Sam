import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';
import { useDispatch } from 'react-redux';
import { restart } from './songSlice';

function xmur3(str: string) {
  for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function() {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
  }
}

function mulberry32SeededRandom(seed: number) {
  return function() {
    var t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function promisifyPlayer(audioBuffer: AudioBuffer) {
  return () => {
    return new Promise( (resolutionFunc) => {
      const player = new Tone.Player(audioBuffer).toDestination();
      player.onstop = resolutionFunc;
      Tone.loaded().then(() => {
        player.start();
      });
    });
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

async function playSong(words: { word: string; sound: ArrayBufferLike; }[]) {
    // await Promise.all

    const sounds: {sound: Tone.Sampler, word: string, duration: number}[] = await Promise.all(
      words.map(async (item) => {
        const audioBuffer = await Tone.getContext().decodeAudioData(item.sound);
        return {
          sound: toSampler(audioBuffer),
          word: item.word,
          duration: audioBuffer.duration
        }
      })
    );

    await Tone.loaded();

    const time = Tone.now();

  const random = mulberry32SeededRandom(xmur3(words[0].word)())
  let timeAdd = 1;
  const spaceBetween = 0.01;
  const baseNote = 60;
  const cutBy = 0.2;
  const chanceOfPause = 0;
  const lengthOfPause = 1;
  for (let i = 0; i < sounds.length; i++) {
      const sampler = sounds[i].sound;
      const length = sounds[i].duration * (1 - cutBy);
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

    const player = new Tone.Player({
      url: "/its-not-over-til-the-bossa-nova.mp3", 
      volume: -13,
      fadeOut: 2
      
    }).toDestination();
    Tone.loaded().then(() => {
      player.start(Tone.now(), 0, timeAdd + 3);
    });

    return () => {
      for (let i = 0; i < sounds.length; i++) {
        const sampler = sounds[i].sound;
        sampler.dispose();
      }
      player.stop(Tone.now());
    }
}


export function PlayingSong(props: {words: { word: string; sound: ArrayBufferLike; }[]}) {
  
  const dispatch = useDispatch();

  function triedToStopNullSong() {
    console.log("Attempted to stop null song");
  }

  let stopSongFunction = triedToStopNullSong;

  useEffect(() => {
    playSong(props.words).then((stopFunction) => {
      stopSongFunction = stopFunction;
    })
    // .catch((e) => {
    //   debugger;
    // })
  })

  function startOver() {
    stopSongFunction();
    stopSongFunction = triedToStopNullSong;
    dispatch(restart());
  }

  function replay() {
    stopSongFunction();
    stopSongFunction = triedToStopNullSong;
  }

  function copySongLink() {
    // dispatch(restart());
  }
  
  return (
    <div className='col-md-4 offset-md-4'>
      <img className='playingIcon' src="music_black.svg"></img>
      <div className='controls'>
        <AwesomeButton type="primary" onPress={startOver}>Start Over</AwesomeButton>
        <AwesomeButton type="primary" onPress={replay}>Replay</AwesomeButton>
        <AwesomeButton type="primary" onPress={copySongLink}>Copy link to song</AwesomeButton>
      </div>
    </div>
  );
}
