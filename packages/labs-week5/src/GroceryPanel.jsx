import "./index.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "./components/Spinner";
import { groceryFetcher } from "./groceryFetcher";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [groceryData, setGroceryData] = useState([]);
    const [selectedStore, setSelectedStore] = useState("MDN");

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.onAddTask(todoName);
    }

    function handleDropdownChange(changeEvent ) {
        const selectedURL = changeEvent.target.value;
        setSelectedStore(selectedURL);
        setError(null);
    }

    useEffect(() => {
        if (!selectedStore) {
            setGroceryData([]);
            return;
        }

        let isStale = false;

        async function fetchData() {
            setError(null);
            setIsLoading(true);
            setGroceryData([]);
        
            try {
                const data = await groceryFetcher.fetch(selectedStore);
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
    }, [selectedStore]);

    
    
    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            
            <label className="mb-4 flex gap-4">
                Get prices from:
                {isLoading ? (
                    <Spinner />  // Show spinner if loading
                ) : (
                <select 
                    className="border border-gray-300 p-1 rounded-sm disabled:opacity-50"
                    disabled={isLoading}
                    value={selectedStore}
                    onChange={handleDropdownChange}
                >
                    <option value="">(None selected)</option>
                    <option value="MDN">MDN</option>
                    <option value="invalid">Who knows?</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    
                </select>
                )}
                {error && <span className="text-red-500 ml-2">{error}</span>}
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}

function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
