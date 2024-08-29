import { fetchWithRetry } from "../utils/FetchUtils";
import { fetchWithDelay } from "../utils/FetchUtils";

const RETRY_LIMIT = 3; // Maximum number of retries
const RETRY_DELAY_MS = 10000; // Delay between retries in milliseconds
const DELAY_MS = 500; // Delay between each fetch of fetchWithDelay

/**
 * Retrieve details on scryfall for given card used mainly for price and shop link
 * @param {* name of the card} cardName 
 */
export async function GetCardDetails(cardName) {

    try {
        const encodedCardName = encodeURIComponent(cardName);
        const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodedCardName}`;

        const response = await fetchWithRetry(apiUrl, RETRY_LIMIT, RETRY_DELAY_MS);

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
};


export async function GetSetDetails(setUri) {

    try {
        const result = await fetchWithRetry(setUri, RETRY_LIMIT, RETRY_DELAY_MS);

        const data = await result.json();
        return data;

    } catch (error) {
        throw error;
    }
};


export async function GetPrintList(prints_search_uri) {

    try {
        const result = await fetchWithRetry(prints_search_uri, RETRY_LIMIT, RETRY_DELAY_MS);

        const data = await result.json();

        // retrieve the data part of the json object
        const dataWithSet = await GetPrintListSet(data.data);

        return dataWithSet;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * return an array with print data and linked set data 
 * @param {list of print for a given card} printList 
 */
async function GetPrintListSet(printList) {

    if (printList.length === 0) return [];

    const printWithSetData = [];

    try {

        for (const print of printList) {
            // Attendre un certain délai avant de faire la requête
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));

            // Fetch set details après le délai
            const set = await GetSetDetails(print.set_uri);

            // Ajouter le résultat à la liste
            printWithSetData.push({
                ...print,
                setData: set
            });
        }

        return printWithSetData;

    } catch (error) {
        console.log(error);
        throw error;
    }
};