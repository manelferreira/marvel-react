import _ from "lodash";

const getRarityKeys = (listSize: number) : number[] => {
    const markAsRareQuantity = 0.1;
    let indexes = new Array(listSize).fill(null).map((_, i) => i);
    return _.sampleSize(indexes, Math.floor(listSize * markAsRareQuantity));
}

export default getRarityKeys;