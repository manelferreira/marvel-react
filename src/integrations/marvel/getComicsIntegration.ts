import ComicSummary from "../../models/ComicSummary";
import Page from "../../models/Page";
import baseMarvelClient from "./baseMarvelClient";
import MarvelPageBaseApiResponse from "./models/MarvelPageBaseApiResponse";
import _ from "lodash";
import getRarityKeys from "./utils/getRarityKeys";

const getComics = async (page: number = 0) : Promise<Page<ComicSummary>> => {
    const response = await makeRequest(page);

    var responseData = response.data;

    let rarityKeys = getRarityKeys(responseData.count);
    
    let comicsList = mapResponse(response, rarityKeys);

    return new Page<ComicSummary>(
        comicsList, 
        responseData.offset + 1, 
        responseData.total, 
        responseData.count);
}

const makeRequest = async (page: number = 0) => {
    if (page > 0)
        page = page - 1;

    const response = await baseMarvelClient
        .get<MarvelPageBaseApiResponse>(
            'v1/public/comics',
            { 
                params: {
                    offset: page
                }
            });

    return response.data;
}

const mapResponse = (response: MarvelPageBaseApiResponse, rarityKeys: number[]) => {
    var responseData = response.data;

    const mappedResponse = responseData.results.map((comicResult, i) => {
        let thumbnailPath : string = comicResult["thumbnail"]["path"];
        let thumbnailExt: string = comicResult["thumbnail"]["extension"];
        let thumbnailUrl = `${thumbnailPath}.${thumbnailExt}`;
        
        let rarity = false;
        if (_.includes(rarityKeys, i))
            rarity = true;

        return new ComicSummary(
            comicResult["id"],
            comicResult["title"],
            thumbnailUrl,
            comicResult["prices"][0]["price"],
            comicResult["description"],
            rarity
        );
    });

    return mappedResponse
}

export default getComics;