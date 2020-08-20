// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const dumbCache = new Map();

async function getWord(word) {
    if (dumbCache.has(word)) {
        return dumbCache.get(word);
    }

    try {
        const result = directlyGetWord(word);
        dumbCache.set(word, result);
        return result;
    } catch (e) {
        // Try once more:
        console.log("Google call failed, but trying once again. ");
        const result = directlyGetWord(word);
        dumbCache.set(word, result);
        return result;
    }
}

async function directlyGetWord(word) {
    // Construct the request
    const request = {
        input: {text: word},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
        };
    const [response] = await client.synthesizeSpeech(request);
    return {
        wordSound: response.audioContent.toString('base64'), 
        wordString: word
    };
}

module.exports = {
    getWord
};