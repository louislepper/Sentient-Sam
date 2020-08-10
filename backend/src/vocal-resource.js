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
        lyricCount: 3
    })

    debugger;
    const words = await Promise.all(experiementalResult.map(async (wordString) => {
        try {
            const sound = await googleClient.getWord(wordString);
            return {sound, wordString};
        } catch (e) {
            console.log(e);
            throw e;
        }
        
    }));

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