import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import config from '../config';

const apiGatewayUrl = config.apiGateway.URL;

export interface WordResult {
  wordString: string;
  wordSound: string;
}

interface SongState {
  songStage: SongStateEnum;
  topic: string | null;
  words: Array<string> | null;
}

interface SongResultPayload {
  topic: string;
  words: Array<WordResult>;
}

export enum SongStateEnum {
  SELECTION,
  LOADING,
  PLAYING
}

const initialState: SongState = {
  songStage: SongStateEnum.SELECTION,
  topic: null,
  words: null
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    selectTopic: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.songStage = SongStateEnum.LOADING;
      state.topic = action.payload
    },
    receiveSong: (state, action: PayloadAction<SongResultPayload>) => {
      state.songStage = SongStateEnum.PLAYING;
      state.topic = action.payload.topic;
      state.words = action.payload.words.map((word) => word.wordString);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    restart: (state) => {
      state.songStage = SongStateEnum.SELECTION;
      state.topic = null;
      state.words = null;
    },
  },
});

const innerRestart = songSlice.actions.restart;
const { receiveSong, selectTopic } = songSlice.actions;

export const restart = (): AppThunk => dispatch => {
  // @ts-ignore
  window.history.pushState({}, '', "/");
  dispatch(innerRestart());
}

interface ProcessedWord {
  wordString: string,
  wordSound: ArrayBufferLike
}

function typedFetch<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    });
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchSong = (topic: string): AppThunk<Promise<ProcessedWord[] | null>> => dispatch => {
  dispatch(selectTopic(topic))
      
  window.history.pushState({topic}, topic, "?topic=" + topic);

  let queryParams = new URLSearchParams();
  queryParams.append("topic", topic);
  queryParams.append("limit", "27");
  
  return typedFetch<SongResultPayload>(`${apiGatewayUrl}/vocalTrack?${queryParams.toString()}`)
        .then(json => {     
          const result = {
            topic: json.topic, 
            words: json.words
          };  
          dispatch(receiveSong(result));
          return processWords(json.words);
        })
        .catch(e => {
          console.log("Unable to fetch song - " + e);
          dispatch(restart());
          return null;
        });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getWordsSelector = (state: RootState) => state.song.words || [];
export const getTopicSelector = (state: RootState) => state.song.topic;

function processWords(words: WordResult[]) {
  return words.map(({wordSound, wordString})=> {
    return {
      wordString, 
      wordSound: Uint8Array.from(atob(wordSound), c => c.charCodeAt(0)).buffer
    }
  });
}

export const selectSongStage = (state: RootState) => state.song.songStage;

export default songSlice.reducer;
