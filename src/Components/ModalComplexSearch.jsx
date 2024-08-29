
import React, { useState, useEffect } from 'react';


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
                    <img className={fireLogoState ? 'logoButtonSelected' : 'logoButton'} src="src\assets\FireLogo.png" alt='logoFeu' onClick={() => { SearchByColor("colorIdentity", "R"); setFireLogoState(!fireLogoState) }}></img>
                    <img className={waterLogoState ? 'logoButtonSelected' : 'logoButton'} src="src\assets\WaterLogo.png" alt='logoEau' onClick={() => { SearchByColor("colorIdentity", "U"); setWaterLogoState(!waterLogoState) }}></img>
                    <img className={swampLogoState ? 'logoButtonSelected' : 'logoButton'} src="src\assets\SwampLogo.png" alt='logoMarais' onClick={() => { SearchByColor("colorIdentity", "B"); setSwampLogoState(!swampLogoState) }}></img>
                    <img className={forestLogoState ? 'logoButtonSelected' : 'logoButton'} src="src\assets\ForestLogo.png" alt='logoForet' onClick={() => { SearchByColor("colorIdentity", "G"); setForestLogoState(!forestLogoState) }}></img>
                    <img className={plainLogoState ? 'logoButtonSelected' : 'logoButton'} src="src\assets\PlaineLogo.png" alt='logoPlaine' onClick={() => { SearchByColor("colorIdentity", "W"); setPlainLogoState(!plainLogoState) }}></img>


                </div>
                <div className='flexBoxSearchButtons'>
                    <p> Cost :</p>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(value => (
                        <img
                            key={value}
                            className={selectedCost === value ? 'logoButtonSelected' : 'logoButton'}
                            src={`src/assets/ManaCost${value}.png`}
                            alt={value}
                            onClick={() => { handleCostClick(value) }}
                        />
                    ))}
                </div>

                <div className='flexBoxSearchButtons'>
                    <p> Rarity :</p>
                    {["Common", "Uncommon", "Rare", "Mythic"].map(value => (
                        <img
                            key={value}
                            className={selectedRarity === value ? 'logoButtonSelected' : 'logoButton'}
                            src={`src/assets/${value}Logo.png`}
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