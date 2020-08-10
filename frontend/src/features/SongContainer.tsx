import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SongInit } from './SongInit';
import { SongStateEnum, selectSongStage } from './songSlice';
import { PlayingSong } from './PlayingSong';

export function SongContainer() {
  debugger;
  const stage = useSelector(selectSongStage);

  // @ts-ignore
  switch(stage) {
    case SongStateEnum.SELECTION:
      return (
        <div className='col'>
          
          <SongInit/>
        </div>
      );
    break;
    case SongStateEnum.PLAYING:
      return (
        <div className='col'>
          <PlayingSong/>
        </div>
      )
    break;
    default:
      return (
        <div className='col'>
          <h1>Invalid State</h1>
        </div>
      )
  }
}
