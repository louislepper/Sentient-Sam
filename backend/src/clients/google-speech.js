// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function getWord(word) {
    // Construct the request
    const request = {
    input: {text: word},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
    };

    // Performs the text-to-speech request
    try {
        const [response] = await client.synthesizeSpeech(request);
        return {...response, word};
    } catch (e) {
        console.log(e);
        throw e;
    }
}

// async function getSentence() {
    
// }

module.exports = {
    getWord
};