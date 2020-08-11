const axios = require('axios').default;
const config = require('../common/config')
var qs = require('qs');

const dumbCache = new Map();

const myClient = axios.create({
    baseURL: config.get('datamuse.address'),
    paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
})

const RELATED_TO_KEY = "ml";
const SOUNDS_LIKE_KEY = "sl";
const PERFECT_RHYMES_WITH_KEY = "rel_rhy";
const APPROXIMATE_RHYMES_WITH_KEY = "rel_nry";
const USED_TO_DESCRIBE_KEY = "rel_jjb";
const TRIGGERED_BY_KEY = "rel_trg";

async function getWords(constraints = {limit: 100}) {

    const cacheKey = JSON.stringify(constraints);
    if (dumbCache.has(cacheKey)) {
        const result = dumbCache.get(cacheKey);
        console.log("Cache hit for: " + cacheKey + "\nGot back: " + JSON.stringify(result));
        return result;
    }

    const {
        relatedTo = [], 
        soundsLike = [], 
        perfectRhymesWith = [], 
        approximateRhymesWith = [], 
        usedToDescribe = [],
        triggeredBy = [],
        limit
    } = constraints;

    const result = await myClient.get('/words', {
        params: {
          [RELATED_TO_KEY]: relatedTo,
          [SOUNDS_LIKE_KEY]: soundsLike,
          [PERFECT_RHYMES_WITH_KEY]: perfectRhymesWith,
          [APPROXIMATE_RHYMES_WITH_KEY]: approximateRhymesWith,
          [USED_TO_DESCRIBE_KEY]: usedToDescribe,
          [TRIGGERED_BY_KEY]: triggeredBy,
          max: limit
        }
      });

      console.log("Made call for: " + cacheKey + "\nGot back: " + JSON.stringify(result.data));

      dumbCache.set(cacheKey, result.data);

      return result.data || [];
}

  

module.exports = {
    getWords
};