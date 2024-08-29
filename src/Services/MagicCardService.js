import CustomError from "../utils/Error";

const apiUrl = import.meta.env.VITE_MAGIC_API_URL;
const endPoint = "/cards";
const pageSize = 60;

// private with endpoint as entry
export async function CardsWebRequest(query, page) {

    try {
        // retrive only card with background image and  only 60 by Page (pageSize)
        const response = await fetch(`${apiUrl + endPoint}?pageSize=${pageSize}&contains=imageUrl&page=${page}${query}`);

        if (response.status != 200) {
            throw new CustomError(response.status, "Error fetching cards");
        };

        // transform response to Json format
        const data = await response.json();

        // throw a not found error if array is empty
        if (data.cards.length === 0) {
            throw new CustomError(404, "No card found");
        };

        // get cards array from data
        const cards = data.cards;

        // retrieve the header of the response
        const linkHeader = response.headers.get('Link');

        // get pagination from header
        const pagination = GetPaginationInHeader(linkHeader);

        return { cards, pagination };

    } catch (error) {
        throw error;
    }
};

function GetPaginationInHeader(linkHeader) {

    if (!linkHeader) { return { lastPage: 1, nextPage: 1 } };

    const parsePageNumber = (rel) => {
        const match = linkHeader.match(new RegExp(`<.*page=(\\d+).*>; rel="${rel}"`));
        return match ? parseInt(match[1], 10) : null;
    };

    const lastPage = parsePageNumber('last');
    const nextPage = parsePageNumber('next');

    return { lastPage, nextPage };
};

export async function GetCardByName(cardName) {

    try {
        const response = await fetch(`${apiUrl + endPoint}?name=${cardName}`);

        if (response.status != 200) {
            throw new CustomError(response.status, `Error fetching card ${cardName}`);
        };

        const data = await response.json();

        const exactMatch = data.cards.find(card => card.name.toLowerCase() === cardName.toLowerCase());

        //if exactMatch exist return it else return the first card of array
        return exactMatch ? exactMatch : data.cards[0];

    } catch (error) {
        console.log(error);
        throw error;
    }
};
