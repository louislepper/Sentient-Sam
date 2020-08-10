import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';

import {
  restart,
  fetchSong,
} from './songSlice';


export function SongInit() {

  const dispatch = useDispatch();

  function onClickHandler() {
      dispatch(fetchSong('shirt'));
    }

  return (
    <div className="col init">
            <form>
              <label>
                Sing me a song about:
                <input type="text"/>
              </label>
              <div>
                <AwesomeButton type="primary" onPress={onClickHandler}>Sing for me</AwesomeButton>
              </div>
            </form>
          </div>
  );
}
