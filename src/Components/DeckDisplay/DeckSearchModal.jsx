import '../../SCSS_File/deckFilterModal.scss'
import React, { useState, useEffect } from 'react';


function DeckSearchModal({ filterLand, filterCard }) {

    const [filteringTypesAndValues, setFilteringTypesAndValues] = useState({});
    const [currentButtonTypes, setCurrentButtonTypes] = useState([]);

    const manageFilterByCardType = (value, type) => {

        let updatedValues = { ...filteringTypesAndValues };

        if (updatedValues[type]) {
            // If type already exists, add the value if it's not already in the array
            if (!updatedValues[type].includes(value)) {
                updatedValues[type] = [...updatedValues[type], value];
            }
            else {

                const existingIndex = updatedValues[type].findIndex(item => item === value);
                updatedValues[type] = [...updatedValues[type]];
                updatedValues[type].splice(existingIndex, 1);
            }
        } else {
            // If type does not exist, add it with the value
            updatedValues[type] = [value];
        }

        setFilteringTypesAndValues(updatedValues);
    }

    const handleClick = (valueButton) => {

        const existingIndex = currentButtonTypes.findIndex(item => item === valueButton);

        let updatedValues = [];

        if (existingIndex !== - 1) {
            updatedValues = [...currentButtonTypes];
            updatedValues.splice(existingIndex, 1)

        }
        else {
            updatedValues = [...currentButtonTypes, valueButton];
        }

        setCurrentButtonTypes(updatedValues);
    }

    useEffect(() => {

        // remove key in object if no more values in key
        for (const key in filteringTypesAndValues) {
            if (filteringTypesAndValues[key] && filteringTypesAndValues[key].length === 0) {
                delete filteringTypesAndValues[key];
            }
        }

        // filter card with given filteringTypesAndValues
        filterCard(filteringTypesAndValues);
    }, [filteringTypesAndValues]);

    return (
        <div className="searchModal">
            <div className='filterButtonFlexbox'>
                <p>Types :</p>
                {["Artifact", "Creature", "Enchantment", "Instant", "Planeswalker", "Sorcery", "Tribal", "Battle"].map(value => (
                    <button
                        key={value}
                        className={currentButtonTypes.includes(value) ? 'filterButtonSelected' : 'filterButton'}
                        onClick={() => { manageFilterByCardType(value, "types"), handleClick(value) }}>
                        {value}</button>
                ))}
            </div>

            <div className='filterButtonFlexbox'>
                <p>Color :</p>
                <img className={currentButtonTypes.includes("W") ? 'logoButtonSelected' : 'logoButton'} src="src\assets\PlaineLogo.png" alt='logoPlaine' onClick={() => { manageFilterByCardType("W", "colorIdentity"), handleClick("W") }}></img>
                <img className={currentButtonTypes.includes("B") ? 'logoButtonSelected' : 'logoButton'} src="src\assets\SwampLogo.png" alt='logoSwamp' onClick={() => { manageFilterByCardType("B", "colorIdentity"), handleClick("B") }}></img>
                <img className={currentButtonTypes.includes("U") ? 'logoButtonSelected' : 'logoButton'} src="src\assets\WaterLogo.png" alt='logoWater' onClick={() => { manageFilterByCardType("U", "colorIdentity"), handleClick("U") }}></img>
                <img className={currentButtonTypes.includes("R") ? 'logoButtonSelected' : 'logoButton'} src="src\assets\FireLogo.png" alt='logoFire' onClick={() => { manageFilterByCardType("R", "colorIdentity"), handleClick("R") }}></img>
                <img className={currentButtonTypes.includes("G") ? 'logoButtonSelected' : 'logoButton'} src="src\assets\ForestLogo.png" alt='logoForest' onClick={() => { manageFilterByCardType("G", "colorIdentity"), handleClick("G") }}></img>
            </div>

            <div className='filterButtonFlexbox'>
                <p>Types :</p>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(value => (
                    <img
                        key={value}
                        src={`src/assets/ManaCost${value}.png`}
                        alt={'cost' + value}
                        className={currentButtonTypes.includes(value) ? 'logoButtonSelected' : 'logoButton'}
                        onClick={() => { manageFilterByCardType(value, "cmc"), handleClick(value) }} />
                ))}
            </div>

            <div className='filterButtonFlexbox'>
                <p> Rarity :</p>
                {["Common", "Uncommon", "Rare", "Mythic"].map(value => (
                    <img
                        key={value}
                        className={currentButtonTypes.includes(value) ? 'logoButtonSelected' : 'logoButton'}
                        src={`src/assets/${value}Logo.png`}
                        alt={value}
                        onClick={() => { manageFilterByCardType(value, "rarity"), handleClick(value) }}
                    />

                ))}
            </div>
        </div>
    );
}

export default DeckSearchModal;