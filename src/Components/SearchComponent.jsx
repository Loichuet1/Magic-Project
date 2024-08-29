import React, { useState } from 'react';
import ModalComplexSearch from "./ModalComplexSearch"
import { useContext } from 'react';
import { ManagerContext } from '../main';

import '../SCSS_File/navStyle.scss'

function Search({ cardLoader }) {

    const { setLoader } = useContext(ManagerContext);
    const { loading, sets } = setLoader;

    const [currentValue, setCurrentValue] = useState("");
    const [modalState, setModalState] = useState(false);

    const searchByType = (type, value) => {

        cardLoader.setPageToDisplay(1);
        cardLoader.LoadCardsByValue(type, value);
    };

    return (
        <>
            <nav className='nav'>

                <img className='logoMagic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScR4JiP7viDcgoibHJfCiIji-EMGxee91cy1a2RNyUaA&s' alt='Logo'></img>
                <input type='text' placeholder='Search By Name' onChange={(e) => setCurrentValue(e.target.value)}></input>


                <svg onClick={() => searchByType("name", currentValue)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="searchButtonNameField">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <select
                    type='text'
                    placeholder='Search By Set Name'
                    name='setName'
                    className='dropDownButtonSet'
                    onChange={(e) => searchByType(e.target.name, e.target.value)}>

                    <option value="">Search By Set Name</option>
                    {sets?.map((set, index) => (
                        <option key={index} value={set.name}>{set.name}</option>
                    ))}
                </select>

                <div className="extendedSearchBlock"> More
                    <svg className="extendedSearchButton" onClick={() => setModalState(!modalState)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </div>


            </nav >
            {modalState && (
                <ModalComplexSearch
                    search={searchByType}
                    parentValues={currentValue}
                />
            )}
        </>
    );
}

export default Search;