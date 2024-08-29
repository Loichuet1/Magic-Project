import { useState, useEffect } from "react";

export default function useCardAvailability({ card, deckBuilder }) {

    const { isCardAvailable, getCardCount } = deckBuilder;

    const [available, setAvailable] = useState(true);
    const [countInDeck, setCountInDeck] = useState(getCardCount(card));

    useEffect(() => {

        if (!card) { return };

        // Met à jour la disponibilité de la carte
        setAvailable(isCardAvailable(card));
        // Met à jour le nombre de cartes dans le deck
        setCountInDeck(getCardCount(card));

    }, [card, deckBuilder.getCardCount(card)]);

    return ({ available, countInDeck })
}