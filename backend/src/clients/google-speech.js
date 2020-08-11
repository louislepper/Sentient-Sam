// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const dumbCache = new Map();

async function getWord(word) {
    if (dumbCache.has(word)) {
        return dumbCache.get(word);
    }

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
        const result = {audioContent: response.audioContent.toString('base64'), word};
        dumbCache.set(word, result);
        return result;
    } catch (e) {
        // Try  once more:
        console.log("Google call failed, but trying once again. ");
        const result = {audioContent: response.audioContent.toString('base64'), word};
        dumbCache.set(word, result);
        return result;
    }
}

// async function getSentence() {
    
// }

module.exports = {
    getWord
};