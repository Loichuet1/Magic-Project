import { useCallback, useEffect, useState } from "react";
import { GetSets } from "../Services/MagicSetServices";

export default function useFetchSet() {

    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSets = useCallback(async () => {
        try {
            setLoading(true);
            const data = await GetSets();
            setSets(data.sets);

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }, [])


    useEffect(() => {

        const fecthSetOnMount = async () => {
            await fetchSets();
        };
        fecthSetOnMount();

    }, [])

    return ({ sets, loading })
};