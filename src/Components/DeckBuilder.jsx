import { useState } from 'react';

function DeckBuilder() {

    const [deckCards, setDeckCards] = useState([]);
    const [deckLands, setDeckLands] = useState([]);
    const [deckName, setDeckNameState] = useState("DefaultName");

    // iner method to retrieve either the card araay or the land array
    const getDeckArray = (type) => {
        //  by default return deckCards if no type is given
        return type && type.includes("Land") ? deckLands : deckCards
    };

    const addCardToDeck = (card) => {

        // early return
        if (!card) return false;

        if (card.type && card.type.includes("Land") && deckLands.filter(l => l.name === card.name).length < 4 || (card.type && card.type.includes("Basic Land"))) {
            const updatedLand = [...deckLands, card]
            setDeckLands(updatedLand);
        } else if (!card.type.includes("Land") && deckCards.filter(c => c.name === card.name).length < 4) {
            const updatedDeck = [...deckCards, card]
            setDeckCards(updatedDeck);
        }
    }

    const removedCardFromDeck = (card) => {

        if (!card) return false;

        let deckToUpdate = getDeckArray(card.type);

        const index = deckToUpdate.findIndex(item => item.name === card.name && item.id === card.id);

        if (index > -1) {
            const updatedDeck = [...deckToUpdate];
            updatedDeck.splice(index, 1);
            card.type.includes("Land") ? setDeckLands(updatedDeck) : setDeckCards(updatedDeck);
            return true;
        }
    };

    // if more than 4 of the same false do not apply to basic land
    const isCardAvailable = (card) => {

        if (!card) return false;

        if (card.type && card.type.includes("Land")) {
            return deckLands.filter(l => l.name === card.name).length < 4 || card.type && card.type.includes("Basic Land")
        } else {
            return deckCards.filter(c => c.name === card.name).length < 4;
        }
    };

    // get the number of the given card in the deck
    const getCardCount = (card) => {

        if (!card) return 0;
        return getDeckArray(card?.type).filter(c => c.name === card.name).length;
    };

    const getCardLimit = (card) => {
        return card && card.type && card.type.includes("Basic Land") ? "None" : 4
    };

    const getCurrentDeck = (type) => {
        return getDeckArray(type) ? getDeckArray(type) : []
    };

    const setDeckName = (newName) => {
        if (newName) {
            setDeckNameState(newName)
        }
    };

    const getDeckName = () => {
        return deckName ? deckName : "DefaultName";
    };

    const saveDeckToDisk = () => {
        try {

            const combinedDeck = {
                cards: deckCards,
                lands: deckLands
            };
            const myDeckAsJson = JSON.stringify(combinedDeck);

            // Create a blob and a link to download
            const blob = new Blob([myDeckAsJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = deckName ? deckName : "DefaultName";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);

            console.log('File has been successfully downloaded');
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };

    const getDeckSize = () => {

        const cardCount = deckCards ? deckCards.length : 0;
        const cardLand = deckLands ? deckLands.length : 0;

        return cardCount + cardLand;
    };

    return { addCardToDeck, getCurrentDeck, getDeckSize, removedCardFromDeck, isCardAvailable, saveDeckToDisk, setDeckName, getDeckName, getCardCount, getCardLimit };
}

export default DeckBuilder;

