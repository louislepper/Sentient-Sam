const dataMuseClient = require('./clients/datamuse');

//Priority list:
    // perfect rhyme and triggered by
    // approx rhyme and triggered by
    // perfect rhyme and related to
    // approx rhyme and related to
    // perfect rhyme and used to describe
    // approx rhyme and used to describe
    // sounds like and triggered by
    // sounds like and related to
    // recursive search for existing.
    // perfect rhyme
    // triggered by


    // {
    //     relatedTo = [], 
    //     soundsLike = [], 
    //     perfectRhymesWith = [], 
    //     approximateRhymesWith = [], 
    //     usedToDescribe = [],
    //     triggeredBy = []
    // } 
const criteriaPriorityList = [
    ["perfectRhymesWith", "triggeredBy"],
    ["approximateRhymesWith", "triggeredBy"],
    ["perfectRhymesWith", "relatedTo"],
    ["approximateRhymesWith", "relatedTo"],
    ["perfectRhymesWith", "usedToDescribe"],
    ["approximateRhymesWith", "usedToDescribe"],
    ["soundsLike", "triggeredBy"],
    ["soundsLike", "relatedTo"],
    ["perfectRhymesWith"],
    ["triggeredBy"],
];

function createRequestsWithCriteria(topic) {
    const mainCriteria = criteriaPriorityList.map((criteria) => {
        return () => dataMuseClient.getWords(
            {...arrayToObject(
                    criteria, 
                    topic
                ), limit: 5 }
            );
    })

    const splitTopic = topic.split(' ');
    const everythingTriggeredBy = () => dataMuseClient.getWords({
        perfectRhymesWith: [splitTopic[splitTopic.length - 1]],
        triggeredBy: [...splitTopic],
        limit: 5
    });

    return [
        ...mainCriteria,
        everythingTriggeredBy
    ];
}

const arrayToObject = (array, value) => {
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item]: value
        }
    }, {});
}

function simplifyTopic(topic) {
    return topic.split(' ')[0];
}

async function getWordBatch({topic, filter}) {
    topic = topic.trim();

    const requestsToMake = createRequestsWithCriteria(topic);

    const results = requestsToMake.map(async (func) => {
        return (await func()).map((item) => item.word).filter(filter);
    })

    for (const result of results) {
        const finishedResult = await result;
        if (finishedResult.length > 0) {
            console.log("Got " + JSON.stringify(finishedResult));
            return finishedResult;
        }
    }

    return [];
}


async function getLyricsForTopic({topic = undefined, lyricCount = 100} = {}) {
    if (!topic) {
        return [];
    }

    topic = topic.trim().toLowerCase();

    const result = [];
    const stack = [];
    const lyricSet = new Set();
    stack.push(topic);
    result.push(topic);
    lyricSet.add(topic);
    while(stack.length > 0 && result.length < lyricCount) {
        const currentWord = stack.pop();
        let nextBatch = await getWordBatch(
            {
                topic: currentWord, 
                filter: (item) => !lyricSet.has(item)
            }
        );

        if (nextBatch.length === 0) {
            nextBatch = currentWord
                .split(' ')
                .sort((a,b) => a.length - b.length)
                .filter((item => !lyricSet.has(item)))
        }

        console.log(currentWord + " -> " + JSON.stringify(nextBatch));

        nextBatch.forEach((item) => {
            lyricSet.add(item);
        })

        result.push(...nextBatch);
        stack.push(...nextBatch);

        
    }

    return result;

    // TODO: sanitise topic, split into words. 

    let lyricCountMap = new Map();
    lyricCountMap.set(topic, 1);
    let lyricList = [topic];
    let currentCriterionIndex = 0; 
    let currentWord = lyricList[lyricList.length - 1];
    while (lyricList.length < lyricCount) {
        let currentResult = [];
        
        console.log("New current word = " + currentWord);
        console.log(lyricList.length + " lyrics so far");
        while (currentResult.length === 0) {
            currentResult = await dataMuseClient.getWords(
                {...arrayToObject(
                        criteriaPriorityList[currentCriterionIndex], 
                        currentWord
                    ), limit: 5 }
                );
            currentCriterionIndex++;


            if (currentCriterionIndex >= criteriaPriorityList.length) {
                if (simplifyTopic(currentWord) !== currentWord) {
                    currentWord = simplifyTopic(currentWord);
                } else if (
                    lyricList[lyricList.length - 2] && 
                    lyricCountMap.get(lyricList[lyricList.length - 2]) <= 3
                    ) {
                        currentWord = lyricList[lyricList.length - 2];
                        continue;
                    } else {
                        console.log("Failure. Couldn't find matches");
                        return lyricList;
                    }
                
                
            }
        }
        const words = currentResult.map((item) => item.word);
        words.forEach(element => {
            lyricCountMap.set(element, (lyricCountMap.get(element) || 0) + 1)
        });
        lyricList = [...lyricList, ...words];
        currentCriterionIndex = 0;
        currentWord = lyricList[lyricList.length - 1];
    }

    return lyricList;
}

module.exports = {
    getLyricsForTopic
}