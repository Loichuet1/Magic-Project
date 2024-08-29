import { useState } from 'react';
import { useFecthCard } from './FecthCard';

export function LoadCard() {

    const [searchValues, setSearchValues] = useState(['']);
    const [searchTypes, setSearchTypes] = useState(['name']);
    const [page, setPageToDisplay] = useState(1);

    const { cards, loading, pages, error } = useFecthCard({ searchTypes, searchValues, page });

    const LoadCardsByValue = (type, value) => {

        // clear arrays
        setSearchValues([]);
        setSearchTypes([]);

        Array.isArray(type) && Array.isArray(value) ? LoadWithMultiplesValues(type, value) : LoadWithSingleValue(type, value)
    }

    const LoadWithSingleValue = (type, value) => {

        setSearchValues([value]);
        setSearchTypes([type]);
    };

    const LoadWithMultiplesValues = (types, values) => {
        const newTypes = [...types];
        setSearchTypes(newTypes);

        const newValues = [...values];
        setSearchValues(newValues);
    };

    return { cards, loading, pages, error, setSearchValues, setSearchTypes, setPageToDisplay, LoadCardsByValue };
}