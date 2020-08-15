import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';
import * as Tone from 'tone';

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

  function onClickHandler() {
      Tone.start();
      dispatch(fetchSong(topic));
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
            </form>
          </div>
  );
}
