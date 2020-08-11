const dataMuseClient = require('./clients/datamuse');
const googleClient = require('./clients/google-speech');

const lyricService = require('./lyric-service')

async function getVocalTrackResource(req){
    // const words = await dataMuseClient.getWords({
        // triggeredBy: "cat",
        // perfectRhymesWith: "cat"
    // });

    // const sounds = await googleClient.getWord("ham");
    const topicString = req.query["topic"];
    const experiementalResult = await lyricService.getLyricsForTopic({
        topic: topicString,
        lyricCount: 10
    })

    debugger;
    const words = (await Promise.all(experiementalResult.map(async (wordString) => {
        try {
            const {audioContent, word} = await googleClient.getWord(wordString);
            return [{sound: audioContent, word}];
        } catch (e) {
            console.log("Discarding " + wordString + " as Google was unable to convert it to speech.");
            console.log(e);
            return [];
        }
    }))).flat();

    return {
        statusCode: 200,
        body: { 
            words,
            topic: topicString
        }
    };
}

module.exports = {
    getVocalTrackResource
}