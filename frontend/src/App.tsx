// @flow
import React, { useState } from 'react';
import './App.css';
import { SongContainer } from './features/SongContainer';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { AboutContent } from './features/AboutContent';

function App() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <div className="App">
      <header>
        <nav>
          <div className="navButtons">
            <button 
              type="button"
              className="link-button" 
              onClick={() => setAboutModalOpen(true)}>
                About
            </button>
            <Modal open={aboutModalOpen} onClose={() => setAboutModalOpen(false)} center>
              <AboutContent/>
            </Modal>
          </div>
        </nav>
      </header>
      <div className="container min-vh-100 song-container">
        <div className="row min-vh-100 justify-content-center align-items-center">
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
