import { useState, useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(source) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [groceryData, setGroceryData] = useState([]);

    useEffect(() => {
        if (!source) {
            setGroceryData([]);
            return;
        }

        let isStale = false;

        async function fetchData() {
            setError(null);
            setIsLoading(true);
            setGroceryData([]);
        
            try {
                const data = await groceryFetcher.fetch(source);
                if (!isStale) setGroceryData(data); 
            } catch {
                if (!isStale) setError("Error fetching data");
            } finally {
                if (!isStale) setIsLoading(false);
            }
        }
        fetchData();
        return () => {
            isStale=true;
        };
    }, [source]);
    return {groceryData, isLoading, error};
}
