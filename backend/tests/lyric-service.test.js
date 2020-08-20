const {describe, expect, it, test} = require('@jest/globals')

jest.mock('../src/clients/datamuse');
const dataMuseClient = require('../src/clients/datamuse');

const client = require('../src/lyric-service');

beforeEach(() => {
    jest.clearAllMocks();
    // dataMuseClient.getWords.mockImplementation(() => {
    //     return [];
    // })
});
  

describe('getLyricsForTopic', () => {
    test('returns empty list when no topic passed', async () => {
        dataMuseClient.getWords.mockReturnValue([]);
        const result = await client.getLyricsForTopic();

        expect(result).toEqual([]);
    });
})


