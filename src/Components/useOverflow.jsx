import { useEffect } from "react";


export default function useOverflow() {

    useEffect(() => {

        // Block scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Cleanup function to re-enable scroll when modal is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])
}