import '../../SCSS_File/deckFilterModal.scss'
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
                <img className={currentButtonTypes.includes("W") ? 'logoButtonSelected' : 'logoButton'} src={PlainLogo} alt='logoPlaine' onClick={() => { manageFilterByCardType("W", "colorIdentity"), handleClick("W") }}></img>
                <img className={currentButtonTypes.includes("B") ? 'logoButtonSelected' : 'logoButton'} src={SwampLogo} alt='logoSwamp' onClick={() => { manageFilterByCardType("B", "colorIdentity"), handleClick("B") }}></img>
                <img className={currentButtonTypes.includes("U") ? 'logoButtonSelected' : 'logoButton'} src={WaterLogo} alt='logoWater' onClick={() => { manageFilterByCardType("U", "colorIdentity"), handleClick("U") }}></img>
                <img className={currentButtonTypes.includes("R") ? 'logoButtonSelected' : 'logoButton'} src={FireLogo} alt='logoFire' onClick={() => { manageFilterByCardType("R", "colorIdentity"), handleClick("R") }}></img>
                <img className={currentButtonTypes.includes("G") ? 'logoButtonSelected' : 'logoButton'} src={ForestLogo} alt='logoForest' onClick={() => { manageFilterByCardType("G", "colorIdentity"), handleClick("G") }}></img>
            </div>

            <div className='filterButtonFlexbox'>
                <p>Types :</p>
                {[ManaCost0, ManaCost1, ManaCost2, ManaCost3, ManaCost4, ManaCost5, ManaCost6, ManaCost7, ManaCost8, ManaCost9, ManaCost10, ManaCost11, ManaCost12, ManaCost13, ManaCost14, ManaCost15, ManaCost16].map((ManaCostImage, value) => (
                    <img
                        key={value}
                        src={ManaCostImage}
                        alt={'cost' + value}
                        className={currentButtonTypes.includes(value) ? 'logoButtonSelected' : 'logoButton'}
                        onClick={() => { manageFilterByCardType(value, "cmc"), handleClick(value) }} />
                ))}
            </div>

            <div className='filterButtonFlexbox'>
                <p> Rarity :</p>
                {[{ value: "Common", logo: CommonLogo }, { value: "Uncommon", logo: UncommonLogo }, { value: "Rare", logo: RareLogo }, { value: "Mythic", logo: MythicLogo }].map(({ value, logo }) => (
                    <img
                        key={value}
                        className={currentButtonTypes.includes(value) ? 'logoButtonSelected' : 'logoButton'}
                        src={logo}
                        alt={value}
                        onClick={() => { manageFilterByCardType(value, "rarity"), handleClick(value) }}
                    />

                ))}
            </div>
        </div>
    );
}

export default DeckSearchModal;