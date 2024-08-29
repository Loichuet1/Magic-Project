import { useState } from "react";
import { costAsSymbols } from "../utils/Utils";
import useCardAvailability from "./usecardAvailability";
import { useContext } from "react";
import { ManagerContext } from "../main";
import AddCartToDeck from "./AddToDeck";

function ManageDeckCard({ card }) {

    const { deckBuilder } = useContext(ManagerContext);

    const { getCardLimit, addCardToDeck, removedCardFromDeck } = deckBuilder;

    // custom hook to manage card availability
    const { countInDeck } = useCardAvailability({ card, deckBuilder });

    return (
        <div className="addToDeckSection">
            <h1>Add to deck :</h1>
            <AddCartToDeck addCallback={addCardToDeck} removeCallback={removedCardFromDeck} cardLimit={getCardLimit} countInDeck={countInDeck} card={card} />
        </div>
    );
};

export function CardDetailInfoSection({ cardData }) {

    return (
        <>
            <div className="imageContainer">
                <img className="detailMainImage" src={cardData.cardDetail.image_uris?.large} alt="image" />
                <ManageDeckCard card={cardData.card} />
            </div>
            <div className="textSection">
                <h2 className="cardName">{cardData.cardDetail.name}</h2>
                <div className="cmc_Type">
                    <h1 > {`Type : ${cardData.cardDetail.type_line}`} </h1>
                    <div className="costSymbolsFlexbox">
                        <h1>Cost :</h1>
                        {costAsSymbols(cardData.cardDetail?.mana_cost).map((symbol, index) => (
                            < img className="costSymbol" key={index} src={symbol}></img>
                        ))}
                    </div>
                </div>

                <p className="cardText">{cardData.cardDetail.oracle_text}</p>
            </div>
        </>
    )
};

export function DoubleArtCardDetailInfoSection({ cardData }) {

    return (
        <>
            <div className="imageContainer">
                <img className="detailMainImage" src={cardData.cardDetail.image_uris?.large} alt="image" />
                <ManageDeckCard card={cardData.card} />
            </div>
            <div className="textSection">
                {cardData.cardDetail?.card_faces.map((face, index) => (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} key={index}>
                        <h2 className="cardName">{face.name}</h2>
                        <div className="cmc_Type">
                            <h1 > {`Type : ${face.type_line}`} </h1>
                            <div className="costSymbolsFlexbox">
                                <h1>Cost :</h1>
                                {costAsSymbols(face.mana_cost).map((symbol, index) => (
                                    < img className="costSymbol" key={index} src={symbol}></img>
                                ))}
                            </div>
                        </div>

                        <p className="cardText" >{face.oracle_text}</p>
                    </div>
                ))}

            </div>
        </>
    )
};

export function DoubleSidedCardDetailInfoSection({ cardData }) {

    const [cardFace, setCardFace] = useState(cardData.cardDetail?.card_faces[0]);

    const changeCardSide = (previousFace) => {

        if (!previousFace) {
            return;
        };

        const nextFace =
            previousFace.illustration_id === cardData.cardDetail?.card_faces[0].illustration_id
                ? cardData.cardDetail?.card_faces[1]
                : cardData.cardDetail?.card_faces[0];

        setCardFace(nextFace);
    };

    return (
        <>
            <div className="imageContainer">

                <img className="detailMainImage" src={cardFace.image_uris?.large} alt="image" />

                <svg onClick={() => changeCardSide(cardFace)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="returnButton">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

                <ManageDeckCard card={cardData.card} />

            </div>

            <div className="textSection">
                <h2 className="cardName">{cardFace.name}</h2>
                <div className="cmc_Type">
                    <h1 > {`Type : ${cardFace.type_line}`} </h1>

                    {cardFace.mana_cost && (
                        <div className="costSymbolsFlexbox">
                            <h1>Cost :</h1>
                            {costAsSymbols(cardFace.mana_cost).map((symbol, index) => (
                                < img className="costSymbol" key={index} src={symbol}></img>
                            ))}
                        </div>
                    )}

                </div>

                <p className="cardText">{cardFace.oracle_text}</p>

            </div>
        </>
    )
};
