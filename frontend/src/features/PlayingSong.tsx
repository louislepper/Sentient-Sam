import React, { useEffect } from 'react';
import * as Tone from 'tone';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';
import { useDispatch } from 'react-redux';
import { restart } from './songSlice';
import { psudorandomGeneratorFromString } from './SeededPsudoRandomGenerator';
import { useAlert } from 'react-alert';

function toSampler(audioBuffer: AudioBuffer) {
  return new Tone.Sampler({
    urls: {
      "C4": audioBuffer,
    },
    release: 1
  }).toDestination();
}

async function playSong(words: { word: string; sound: ArrayBufferLike; }[]) {
  const sounds: { sound: Tone.Sampler, word: string, duration: number }[] = await Promise.all(
    words.map(async (item) => {
      const audioBuffer = await Tone.getContext().decodeAudioData(item.sound.slice(0));
      return {
        sound: toSampler(audioBuffer),
        word: item.word,
        duration: audioBuffer.duration
      }
    })
  );

  await Tone.loaded();

  const time = Tone.now();

  const random = psudorandomGeneratorFromString(words[0].word);
  let timeAdd = 5;
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

function triedToStopNullSong() {
  console.log("Attempted to stop null song");
}

const {
  stopSong, 
  setStopSongFunction
}: {
  stopSong: () => void, 
  setStopSongFunction: (f: () => void) => void
} = (() => {
  let stopSongFunction = triedToStopNullSong;
return {
  stopSong: () => {
    stopSongFunction();
    stopSongFunction = triedToStopNullSong;
  },
  setStopSongFunction: (stopFunction: () => void) => {
    stopSongFunction = stopFunction;
  }
}
})();

export function PlayingSong(props: { words: { word: string; sound: ArrayBufferLike; }[] }) {
  const dispatch = useDispatch();

  useEffect(() => {
    playSong(props.words).then((stopFunction) => {
      setStopSongFunction(stopFunction);
    })
  })

  function startOver() {
    stopSong();
    dispatch(restart());
  }

  const alert = useAlert();

  function fallbackCopyTextToClipboard(text: string) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      let successful = document.execCommand('copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text: string) {
    if (!window.navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    window.navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  function replay() {
    stopSong();
    Tone.start().then(() => {
      return playSong(props.words);
    }).then((stopFunction) => {
      setStopSongFunction(stopFunction);
    })
  }

  function copySongLink() {
    // @ts-ignore
    if (window.navigator.share) {
      // @ts-ignore
      window.navigator.share({
        title: 'Sentient Sam sings about ' + props.words[0].word,
        text: 'Check out Sentient Sam. A robo-poet who\'ll sing about whatever you want it to.' ,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
      copyTextToClipboard(window.location.href);
      console.log("copied link to clipboard");
      alert.show("Copied link to clipboard");
    }
    // dispatch(restart());
  }

  return (
    <div>
      <div className='row justify-content-md-center'>
        <div className='col-md-4'>
          <img className='playingIcon' alt="The song has started playing" src="music_black.svg"></img>
        </div>
      </div>
      <div className='row controls justify-content-md-center'>
        <div className='col-md-auto'><AwesomeButton type="primary" onPress={startOver}>Start Over</AwesomeButton></div>
        <div className='col-md-auto'><AwesomeButton type="primary" onPress={replay}>Replay</AwesomeButton></div>
        <div className='col-md-auto'><AwesomeButton type="primary" onPress={copySongLink}>Copy link to song</AwesomeButton></div>
      </div>
    </div>
    
  );
}
