import { useEffect, useState } from "react";
import "./App.css";

import List from "./components/List/List";
import Search from "./components/Search/Search";

const data = ["asd", "sdf", "dfg", "ghj", "hjk", "jkl"];

function App() {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState(data);

    useEffect(() => {
        setItems(
            (prev) =>
                (prev = data.filter((el) =>
                    el.toLowerCase().includes(search.toLowerCase())
                ))
        );
    }, [search]);

    return (
        <div className="App">
            <header className="App-header">
                <Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                >
                    Find course:
                </Search>
                <List items={items} />
            </header>
        </div>
    );
}

export default App;
