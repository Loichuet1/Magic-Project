import React, { useState, useEffect } from 'react';
import { GetImageByLanguage } from "../CardLocalizer"
import { Link } from 'react-router-dom';
import { cleanCardName } from '../../utils/Utils';

function CreateCardInDeck({ card, openDetails, type }) {

    return (
        <Link to={`/cardDetails/${cleanCardName(card.name)}`}>
            <img
                className={type === "land" ? "landCard" : "deckCard"}
                onClick={() => openDetails(card)}
                src={GetImageByLanguage("eng", card)}
                alt="image card"
            />
        </Link>

    );
}

export default CreateCardInDeck;

