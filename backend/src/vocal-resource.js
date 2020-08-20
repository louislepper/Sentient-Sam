const dataMuseClient = require('./clients/datamuse');
const googleClient = require('./clients/google-speech');

const lyricService = require('./lyric-service')

async function getVocalTrackResource(req){
    const topicString = req.query["topic"];
    const limit = Math.min(req.query["limit"] || 10, 40);

    const lyrics = await lyricService.getLyricsForTopic({
        topic: topicString,
        lyricCount: limit
    })

    const words = (await Promise.all(lyrics.map(async (wordString) => {
        try {
            return [await googleClient.getWord(wordString)];
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