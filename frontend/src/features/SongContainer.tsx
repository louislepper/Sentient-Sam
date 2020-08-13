import React from 'react';
import { useSelector } from 'react-redux';
import { SongInit } from './SongInit';
import { SongStateEnum, selectSongStage, selectWords } from './songSlice';
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
  const words = useSelector(selectWords);

  switch(stage) {
    case SongStateEnum.SELECTION:
      return (
        <div className='col'>
          <SongInit/>
        </div>
      );
    case SongStateEnum.PLAYING:
        if (words == null) {
          return invalidState();
        }

      return (
        <div className='col'>
          <PlayingSong words={words}/>
        </div>
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
