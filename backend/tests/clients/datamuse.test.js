const {describe, expect, it, test} = require('@jest/globals')

const axiosClient = {
    get: jest.fn()
}
    
jest.mock('axios');
const axios = require('axios');
let providedParamsSerialiser = null;
axios.default.create.mockImplementation(({paramsSerializer}) => {
    providedParamsSerialiser = paramsSerializer;
    return axiosClient;
})

const client = require('../../src/clients/datamuse');

beforeEach(() => {
    jest.clearAllMocks();
    axiosClient.get.mockReturnValue({});
});
  

describe('getWords', () => {
    // test('returns empty list when no params passed', async () => {
    //     axiosClient.get.mockReturnValue([]);
    //     const result = await client.getWords();

    //     expect(result).toBe([]);
    // });

    test('getWords calls the datamuse API as expected', async () => {
        
        await client.getWords({
            relatedTo: ["a", "b"], 
            soundsLike: ["c", "d"], 
            perfectRhymesWith: ["e", "f"], 
            approximateRhymesWith: ["g", "h"], 
            usedToDescribe: ["i", "j"],
            triggeredBy: ["k", "l"]
        });
        
        const {params} = axiosClient.get.mock.calls[0][1];
        
        expect(providedParamsSerialiser(params))
            .toEqual(
                "ml=a&ml=b&sl=c&sl=d&rel_rhy=e&rel_rhy=f&rel_nry=g&rel_nry=h&rel_jjb=i&rel_jjb=j&rel_trg=k&rel_trg=l"
                );
    });

    test('getWords calls the datamuse API as expected, with only two critereon', async () => {
        await client.getWords({
            soundsLike: ["c", "d"], 
            triggeredBy: ["k"]
        });
    
        const {params} = axiosClient.get.mock.calls[0][1];
        
        expect(providedParamsSerialiser(params))
            .toEqual("sl=c&sl=d&rel_trg=k")

        // expect(axiosClient.get).toBeCalledWith('/words', {
        //     params: {
        //         "sl": ["c", "d"], 
        //         "rel_trg": ["k", "l"]
        //     }
        // });
    });
})


