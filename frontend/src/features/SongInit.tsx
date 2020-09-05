import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';
import { isIOS } from './ios-utils';
import { startTone } from './start-tone';
import { initSong, startSong } from './audio-controller';
import { restart } from './songSlice';

import {
  fetchSong,
} from './songSlice';

function isBlank(str: string | null) {
  return (!str || str.trim().length === 0);
}

export function SongInit() {

  const [topic, setTopic] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const topic = searchParams.get("topic");

    if (!isBlank(topic)) {
      setTopic(topic || "");
    }
  }, [])

  async function onClickHandler() {
      // Start up tone
      const tonePromise = startTone();
      // Fetch the song
      // @ts-ignore
      const songData: { wordString: string; wordSound: ArrayBufferLike; }[] = await dispatch(fetchSong(topic));

      // Wait for tone to have finished starting up (likely already finished)
      await tonePromise;

      if (songData) {
        try {
          await initSong(songData, topic);
          startSong();
        } catch (e) {
          console.log("Got an error, heading back to selection. " + e);
          dispatch(restart());
        }
      }
  }

  function handleTopicInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTopic(e.target.value);
  }

  return (
    <div className="col init">
            <form onSubmit={onClickHandler}>
              <label>
                Sing me a song about:
                <input className="topicInput" value={topic} type="text" onChange={ handleTopicInput }/>
              </label>
              <div>
                <AwesomeButton type="primary" onPress={onClickHandler}>Sing for me</AwesomeButton>
              </div>
              {isIOS() &&
                <div className="iphoneHint"><p>Don't forget to unsilence your iphone (the physical switch on the top left of the phone) </p></div>
              }
            </form>
          </div>
  );
}
