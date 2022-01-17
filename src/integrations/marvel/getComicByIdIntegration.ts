import _ from "lodash";
import Comic from "../../models/Comic";
import baseMarvelClient from "./baseMarvelClient";
import MarvelPageBaseApiResponse from "./models/MarvelPageBaseApiResponse";
import getRarityKeys from "./utils/getRarityKeys";

const getComicById = async (id: string | undefined) : Promise<Comic> => {
    const comicResponse = await baseMarvelClient
        .get<MarvelPageBaseApiResponse>(
            `v1/public/comics/${id}`);

    var comicResponseData = comicResponse.data.data;
    
    let comicsList = comicResponseData.results.map(comicResult => {
        let thumbnailPath : string = comicResult["thumbnail"]["path"];
        let thumbnailExt: string = comicResult["thumbnail"]["extension"];
        let thumbnailUrl = `${thumbnailPath}.${thumbnailExt}`;
        
        return new Comic(
            comicResult["id"],
            comicResult["title"],
            thumbnailUrl,
            comicResult["prices"][0]["price"],
            comicResult["description"],
            shouldMarkAsRare()
        );
    });

    return comicsList[0];
}

const shouldMarkAsRare = () => {
    const key = 1;
    const rarityKeys = getRarityKeys(10);
    return _.includes(rarityKeys, key);
}

export default getComicById;