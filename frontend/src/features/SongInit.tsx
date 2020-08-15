import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';
import * as Tone from 'tone';

import {
  restart,
  fetchSong,
} from './songSlice';


export function SongInit() {

  const [topic, setTopic] = useState("");

  const dispatch = useDispatch();

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
                <input className="topicInput" type="text" onChange={ handleTopicInput }/>
              </label>
              <div>
                <AwesomeButton type="primary" onPress={onClickHandler}>Sing for me</AwesomeButton>
              </div>
            </form>
          </div>
  );
}
