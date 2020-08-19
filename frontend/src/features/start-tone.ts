import * as Tone from 'tone';

// Hack for audio context resumption in ios
export function startTone(){
    //@ts-ignore
    if (Tone.context.state === 'interrupted' || 
    Tone.context.state === 'suspended') {
      //@ts-ignore
      return Tone.context._context.resume();
  }

  return Promise.resolve();
}