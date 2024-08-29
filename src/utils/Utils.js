
import { EManaCost } from '../enums/EManaCost'
import { ECurrency } from '../enums/ECurrency';

export const costAsSymbols = (costString) => {

    if (!costString) return [];

    const costArray = costString.match(/(\d+|[BGWURX])/g);

    // Map the filtered characters to their corresponding image paths
    const symbolsArray = costArray.map(cost => EManaCost[cost] || '');

    return symbolsArray; // Returns an array of image paths

};

export const currencyStringToSymbols = (currencyString) => {

    if (!currencyString) { return ""; };
    return ECurrency[currencyString] || "";
};

export const objectToArray = (objectToConvert) => {

    // return empty array if objectToConvert null
    if (!objectToConvert) { return [] };

    const convertedArray = [];

    for (const key in objectToConvert) {
        if (objectToConvert.hasOwnProperty(key)) {
            convertedArray.push({ key: key, value: objectToConvert[key] });
        };
    };

    return convertedArray;
};

export const cleanCardName = (cardName) => {
    // Extract the base part of the URL before `//`
    const parts = cardName.split('//');
    const result = parts[0].trim(); // trim() is used to remove any leading or trailing whitespace
    return result;
};

