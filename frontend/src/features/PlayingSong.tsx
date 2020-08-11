import React, { useEffect } from 'react';
import * as Tone from 'tone';

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
      //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");

    const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
    
    const sounds = await Promise.all(words.map((item) => Tone.getContext().decodeAudioData(item.sound)));

    const playerPromises = sounds.map((audioBuffer) => promisifyPlayer(audioBuffer));

    const samplers = sounds.map((audioBuffer) => toSampler(audioBuffer));

    await Tone.loaded();

    const time = Tone.now();


  let timeAdd = 1;
  let length = 0.5
  let note = 60;
  for (let i = 0; i < samplers.length; i++) {
      const sampler = samplers[i];
      const randomNoteChange = Math.floor(Math.random() * 10) - 5;
      const randomTimeChange = Math.random() * 0.5 - 0.25;
      sampler.triggerAttackRelease([Tone.Midi(note + randomNoteChange).toFrequency()], length + randomTimeChange, time + timeAdd);
      
      timeAdd += length + randomTimeChange;
    }

    // for (let i = 0; i < sounds.length; i++) {
    //   await playerPromises[i]();
    // }
}


export function PlayingSong(props: {words: { word: string; sound: ArrayBufferLike; }[]}) {
  
  useEffect(() => {
    playSong(props.words);
  })
  
  return (
    <div className='col-md-4 offset-md-4'>
      <img src="music_black.svg"></img>
    </div>
  );
}
