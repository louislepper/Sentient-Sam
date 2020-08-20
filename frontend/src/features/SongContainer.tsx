import React from 'react';
import { useSelector } from 'react-redux';
import { SongInit } from './SongInit';
import { SongStateEnum, selectSongStage, getWordsSelector, getTopicSelector } from './songSlice';
import { PlayingSong } from './PlayingSong';
import 'loaders.css/loaders.css';
import Loader from 'react-loaders'

function invalidState() {
  return (
    <div className='col'>
      <h1>Invalid State</h1>
    </div>
  )
}

export function SongContainer() {
  const stage = useSelector(selectSongStage);
  const words = useSelector(getWordsSelector);
  const topic = useSelector(getTopicSelector);

  switch(stage) {
    case SongStateEnum.SELECTION:
      return (
          <SongInit/>
      );
    case SongStateEnum.PLAYING:
        if (words == null || topic == null) {
          return invalidState();
        }

      return (
          <PlayingSong words={words} topic={topic}/>
      )
    case SongStateEnum.LOADING:
      return (
        <div className="loadingAnimation"> 
                {/*
                  // @ts-ignore */}
                <Loader active={true} color="black" type="line-scale-party"/>
        </div>
      )
    default:
      return invalidState();
  }
}
