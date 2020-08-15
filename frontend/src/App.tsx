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
              <div className="iconsAttribution">Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
              <div className="musicAttribution">Music: It's Not Over 'Til The Bossa Nova by Shane Ivers - <a href="https://www.silvermansound.com">https://www.silvermansound.com</a></div>
            </div>
        </footer>
    </div>
  );
}

export default App;
