import React, { useState, useEffect } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import CreateCardInDeck from './CardInDeck'
import DeckSearchModal from './DeckSearchModal'
import DeckLogo from '/src/assets/DeckLogo.png'
import 'react-edit-text/dist/index.css';

import '../../SCSS_File/flexboxDeck.scss'

function DisplayDeck({ deckBuilder }) {

    const { getCurrentDeck, saveDeckToDisk, setDeckName, getDeckSize } = deckBuilder;

    const [isModalOpen, setModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);

    // UseState for details display of one card
    const [selectedcard, setSelectedcard] = useState(null);
    const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);

    const [displayedCard, setDisplayedCard] = useState(getCurrentDeck())
    const [displayedLand, setDisplayedLand] = useState(getCurrentDeck("Land"))

    const opencardDetail = (card) => {
        setSelectedcard(card);
        setIsCardDetailVisible(true);
    }

    const closeCardDetail = () => {
        setIsCardDetailVisible(false);
    }

    const SaveDeck = () => {
        if (deckBuilder) {
            saveDeckToDisk();
        }
    }

    const ChangeDeckName = (name) => {
        if (deckBuilder) {
            setDeckName(name);
        }
    }

    const filterLand = () => {

    }

    const filterCard = (filteringTypesAndValues) => {

        let filterCards = [...getCurrentDeck()];

        if (Object.keys(filteringTypesAndValues).length > 0) {
            for (const type in filteringTypesAndValues) {

                let filterValues = filteringTypesAndValues[type];

                filterCards = filterCards.filter(card => {
                    return filterValues.some(value => Array.isArray(card[type]) ? card[type].includes(value) : card[type] === value);
                });
            }
        }
        setDisplayedCard(filterCards);
    }

    // useEffect to update availability
    useEffect(() => {
        setDisplayedLand(getCurrentDeck("Land"));
        setDisplayedCard(getCurrentDeck());
    }, [deckBuilder]);

    return (
        <>
            <img src={DeckLogo} className='modalButtonInNav' onClick={() => { setModalOpen(!isModalOpen); closeCardDetail() }}></img>

            {/* Modal*/}
            {isModalOpen && (
                <div className="modal">
                    <header className='modalHeader'>
                        <div className='flexboxNameInput'>
                            <div className='nameTittle'> Deck name : </div>
                            <EditText className='input' inputClassName='inputText' defaultValue="DefaultName" onSave={(e) => ChangeDeckName(e.value)} />
                        </div>
                        <p style={{ color: getDeckSize() < 60 ? 'red' : 'black' }}>{getDeckSize()} /60</p>
                        <div className='flexboxButtons'>
                            <svg onClick={() => setSearchModalOpen(!isSearchModalOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <svg onClick={SaveDeck} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                            </svg>
                            <svg onClick={() => setModalOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </header>
                    <>  {isSearchModalOpen && (
                        <DeckSearchModal
                            filterLand={filterLand}
                            filterCard={filterCard} />
                    )}
                    </>

                    <> {isCardDetailVisible &&
                        (<DisplayCartDetails
                            card={selectedcard}
                            closeDetails={closeCardDetail}
                            deckBuilder={deckBuilder} />)}
                    </>
                    <div className="flexboxDeck">
                        <div className='cardZone'>
                            {displayedCard.map((card, index) =>
                                <CreateCardInDeck
                                    key={index}
                                    card={card}
                                    openDetails={opencardDetail}
                                    type={"card"} />)}
                        </div>
                        <div className='landZone'>
                            {displayedLand.map((card, index) =>
                                <CreateCardInDeck
                                    key={index}
                                    card={card}
                                    openDetails={opencardDetail}
                                    type={"land"} />)}
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default DisplayDeck;