import { useState, useEffect, useCallback } from 'react';
import { CardsWebRequest } from '../Services/MagicCardService';

export const useFecthCard = ({ searchTypes, searchValues, page }) => {

    const [cards, setCards] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: null,
        message: null
    });
    const [pages, setPages] = useState({
        currentPage: null,
        nextPage: null,
        lastPage: null
    });

    const fetchCard = useCallback(async () => {

        if (loading) return;

        try {
            setLoading(true);
            // reset error state
            setError({
                status: null,
                message: null
            });

            const query = "&" + searchTypes
                .map((type, index) => `${type}=${searchValues[index]}`)
                .join('&');

            const { cards, pagination } = await CardsWebRequest(query, page);

            setPages(prevPages => ({
                // Infer the currentPage if nextPage is available, otherwise fallback to prevPages.currentPage
                currentPage: pagination.nextPage !== undefined && pagination.nextPage !== null
                    ? pagination.nextPage - 1
                    : page,

                // Set nextPage to pagination.nextPage if available, otherwise fallback to prevPages.nextPage
                nextPage: pagination.nextPage !== undefined && pagination.nextPage !== null
                    ? pagination.nextPage
                    : prevPages.nextPage,

                // Set lastPage to pagination.lastPage if available, otherwise fallback to prevPages.lastPage
                lastPage: pagination.lastPage !== undefined && pagination.lastPage !== null
                    ? pagination.lastPage
                    : prevPages.lastPage
            }));

            setCards(cards);
        } catch (err) {
            console.log(err);

            setError({
                status: err.status,
                message: err.message
            });
        }
        finally {
            setLoading(false);
        }
    }, [searchTypes, searchValues, page]);

    useEffect(() => {
        const asyncFecth = async () => {
            await fetchCard();
        }
        asyncFecth();

    }, [searchTypes, searchValues, page]);

    return { cards, loading, pages, error };
};