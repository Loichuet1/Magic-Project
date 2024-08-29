
import React, { useState, useEffect } from 'react';

// Color logos
import FireLogo from '/src/assets/FireLogo.png';
import WaterLogo from '/src/assets/WaterLogo.png';
import SwampLogo from '/src/assets/SwampLogo.png';
import ForestLogo from '/src/assets/ForestLogo.png';
import PlainLogo from '/src/assets/PlaineLogo.png';

// Mana cost logos
import ManaCost0 from '/src/assets/ManaCost0.png';
import ManaCost1 from '/src/assets/ManaCost1.png';
import ManaCost2 from '/src/assets/ManaCost2.png';
import ManaCost3 from '/src/assets/ManaCost3.png';
import ManaCost4 from '/src/assets/ManaCost4.png';
import ManaCost5 from '/src/assets/ManaCost5.png';
import ManaCost6 from '/src/assets/ManaCost6.png';
import ManaCost7 from '/src/assets/ManaCost7.png';
import ManaCost8 from '/src/assets/ManaCost8.png';
import ManaCost9 from '/src/assets/ManaCost9.png';
import ManaCost10 from '/src/assets/ManaCost10.png';
import ManaCost11 from '/src/assets/ManaCost11.png';
import ManaCost12 from '/src/assets/ManaCost12.png';
import ManaCost13 from '/src/assets/ManaCost13.png';
import ManaCost14 from '/src/assets/ManaCost14.png';
import ManaCost15 from '/src/assets/ManaCost15.png';
import ManaCost16 from '/src/assets/ManaCost16.png';

// Ratity Logos
import CommonLogo from '/src/assets/CommonLogo.png';
import UncommonLogo from '/src/assets/UncommonLogo.png';
import RareLogo from '/src/assets/RareLogo.png';
import MythicLogo from '/src/assets/MythicLogo.png';

function ModalComplexSearch({ search, parentValues }) {

    // use state for logo button
    const [fireLogoState, setFireLogoState] = useState(false);
    const [waterLogoState, setWaterLogoState] = useState(false);
    const [swampLogoState, setSwampLogoState] = useState(false);
    const [forestLogoState, setForestLogoState] = useState(false);
    const [plainLogoState, setPlainLogoState] = useState(false);

    // Types and values used to filter
    const [types, setTypes] = useState([]);
    const [values, setValues] = useState([]);

    // use for cost state
    const [selectedCost, setSelectedCost] = useState(null);

    const handleCostClick = (cmc) => {

        if (selectedCost === cmc) {
            setSelectedCost(null); // Deselect the current cost if it's clicked again

            const filteredTypes = types.filter(t => t !== "cmc");
            const filteredValues = values.filter(v => !(Number.isInteger(v)));

            setTypes(filteredTypes);
            setValues(filteredValues);
        } else {
            setSelectedCost(cmc); // Set the selected cost
            SetValuesAndTypes("cmc", cmc)
        }
    }

    // use for Rarity state
    const [selectedRarity, setSelectedRarity] = useState(null);

    const handleRarityClick = (rarity) => {

        if (selectedRarity === rarity) {
            setSelectedRarity(null); // Deselect the current Rarity if it's clicked again

            const filteredTypes = types.filter(t => t !== "rarity");
            const filteredValues = values.filter(v => v !== "Common" && v !== "Uncommon" && v !== "Rare" && v !== "Mythic");

            setTypes(filteredTypes);
            setValues(filteredValues);

        } else {
            setSelectedRarity(rarity); // Set the selected Rarity
            SetValuesAndTypes("rarity", rarity)
        }
    }

    // use for type state
    const [selectedCardType, setSelectedCardType] = useState(null);

    const handleCardTypeClick = (type) => {
        if (selectedCardType === type) {
            setSelectedCardType(null); // Deselect the current Rarity if it's clicked again

            const filteredTypes = types.filter(t => t !== "types");
            const filteredValues = values.filter(v => v !== "Artifact" && v !== "Creature"
                && v !== "Enchantment" && v !== "Instant" && v !== "Land" && v !== "Planeswalker" && v !== "Sorceries"
                && v !== "Tribal");

            setTypes(filteredTypes);
            setValues(filteredValues);

        } else {
            setSelectedCardType(type); // Set the selected Rarity
            SetValuesAndTypes("types", type)
        }
    }

    const SetValuesAndTypes = (type, value) => {

        // Check if the type already exists in the state
        const existingIndex = types.findIndex(item => item === type);

        if (existingIndex !== -1) {
            // If it exists, update the value
            const updatedValues = [...values];
            updatedValues[existingIndex] = value;
            setValues(updatedValues);


        } else {
            // If it doesn't exist, add it to the arrays
            setTypes([...types, type]);
            setValues([...values, value]);
        }
    }

    const SearchByColor = (type, value) => {

        // Check if the type and value combination already exists in the state
        const existingIndex = values.findIndex(item => item === value);

        if (existingIndex !== -1) {
            // If it exists, remove it from all arrays
            const updatedTypes = [...types];
            updatedTypes.splice(existingIndex, 1);
            setTypes(updatedTypes);

            const updatedValues = [...values];
            updatedValues.splice(existingIndex, 1);
            setValues(updatedValues);

        } else {
            // If it doesn't exist, add it to all arrays
            setTypes([...types, type]);
            setValues([...values, value]);
        }
    }

    useEffect(() => {
        // Reset buttons visual
        setSelectedRarity(null);
        setSelectedCost(null);
        setSelectedCardType(null);
        setFireLogoState(false);
        setWaterLogoState(false);
        setSwampLogoState(false);
        setForestLogoState(false);
        setPlainLogoState(false);

        // Empty search types and values
        setTypes([]);
        setValues([]);
    }, [parentValues]);

    return (
        <div className='modalExtendedSearch'>
            <div className='modalFlexbox'>
                <div className='flexBoxSearchButtons'>
                    <p> Color : </p>
                    <img className={fireLogoState ? 'logoButtonSelected' : 'logoButton'} src={FireLogo} alt='logoFeu' onClick={() => { SearchByColor("colorIdentity", "R"); setFireLogoState(!fireLogoState) }}></img>
                    <img className={waterLogoState ? 'logoButtonSelected' : 'logoButton'} src={WaterLogo} alt='logoEau' onClick={() => { SearchByColor("colorIdentity", "U"); setWaterLogoState(!waterLogoState) }}></img>
                    <img className={swampLogoState ? 'logoButtonSelected' : 'logoButton'} src={SwampLogo} alt='logoMarais' onClick={() => { SearchByColor("colorIdentity", "B"); setSwampLogoState(!swampLogoState) }}></img>
                    <img className={forestLogoState ? 'logoButtonSelected' : 'logoButton'} src={ForestLogo} alt='logoForet' onClick={() => { SearchByColor("colorIdentity", "G"); setForestLogoState(!forestLogoState) }}></img>
                    <img className={plainLogoState ? 'logoButtonSelected' : 'logoButton'} src={PlainLogo} alt='logoPlaine' onClick={() => { SearchByColor("colorIdentity", "W"); setPlainLogoState(!plainLogoState) }}></img>


                </div>
                <div className='flexBoxSearchButtons'>
                    <p> Cost :</p>
                    {[ManaCost0, ManaCost1, ManaCost2, ManaCost3, ManaCost4, ManaCost5, ManaCost6, ManaCost7, ManaCost8, ManaCost9, ManaCost10, ManaCost11, ManaCost12, ManaCost13, ManaCost14, ManaCost15, ManaCost16].map((ManaCostImage, value) => (
                        <img
                            key={value}
                            className={selectedCost === value ? 'logoButtonSelected' : 'logoButton'}
                            src={ManaCostImage}
                            alt={value}
                            onClick={() => { handleCostClick(value) }}
                        />
                    ))}
                </div>

                <div className='flexBoxSearchButtons'>
                    <p> Rarity :</p>
                    {[{ value: "Common", logo: CommonLogo }, { value: "Uncommon", logo: UncommonLogo }, { value: "Rare", logo: RareLogo }, { value: "Mythic", logo: MythicLogo }].map(({ value, logo }) => (
                        <img
                            key={value}
                            className={selectedRarity === value ? 'logoButtonSelected' : 'logoButton'}
                            src={logo}
                            alt={value}
                            onClick={() => { handleRarityClick(value) }}
                        />
                    ))}
                </div>

                <div className='flexBoxSearchButtons'>
                    <p> Type :</p>
                    {["Artifact", "Creature", "Enchantment", "Instant", "Land", "Planeswalker", "Sorcery", "Tribal", "Battle"].map(type => (
                        <button
                            key={type}
                            className={selectedCardType === type ? "typeButtonSelected" : "typeButton"}
                            onClick={() => handleCardTypeClick(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <svg onClick={() => { search(types, values) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="searchButton">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>

        </div>
    );
}


export default ModalComplexSearch;