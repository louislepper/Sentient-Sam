import * as Tone from 'tone';

const osc = new Tone.Oscillator();
const gain = new Tone.Gain(1e-37);

// Hack for audio context resumption in ios
export function startTone(){
  Tone.start();
  console.log("Audio context state: " + Tone.context.state);
  osc.connect(gain)
  osc.start();
  gain.toDestination();
}