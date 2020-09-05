import React from 'react';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';
import { useDispatch } from 'react-redux';
import { restart } from './songSlice';
import { useAlert } from 'react-alert';
import { copyTextToClipboard } from './clipboard-utils';
import { startTone } from './start-tone';
import { clearSong, startSong, stopSong } from './audio-controller';

export function PlayingSong(props: { 
  words: { 
    wordString: string; 
    wordSound: ArrayBufferLike; 
  }[] ,
  topic: string
}) {
  const dispatch = useDispatch();

  async function startOver() {
    clearSong();
    dispatch(restart());
  }

  const alert = useAlert();

  async function replay() {
    try {
      await stopSong();
      await startTone();
      startSong();
    } catch(e) {
      console.log("Unable to replay song " + e);
    }
  }

  function copySongLink() {
    // @ts-ignore
    if (window.navigator.share) {
      // @ts-ignore
      window.navigator.share({
        title: 'Sentient Sam sings about ' + props.topic,
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
  }

  return (
    <div className='col'>
      <div className='row justify-content-md-center'>
        <div className='col-md-4'>
          <img className='playingIcon' alt="The song has started playing" src="music_black.svg"></img>
        </div>
      </div>
      <div className='row controls justify-content-md-center'>
        <div className='col-md-auto control-buttons'><AwesomeButton type="primary" onPress={startOver}>Start Over</AwesomeButton></div>
        <div className='col-md-auto control-buttons'><AwesomeButton type="primary" onPress={replay}>Replay</AwesomeButton></div>
        <div className='col-md-auto control-buttons'><AwesomeButton type="primary" onPress={copySongLink}>Copy link to song</AwesomeButton></div>
      </div>
    </div>
  );
}
