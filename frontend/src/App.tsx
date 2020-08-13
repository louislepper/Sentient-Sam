// @flow
import React from 'react';
import './App.css';
import { SongContainer } from './features/SongContainer';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex align-items-center min-vh-100">
          <SongContainer/>
        </div>
      </div>
      <footer>
            <div className="attribution">
              Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
        </footer>
    </div>
  );
}

export default App;
