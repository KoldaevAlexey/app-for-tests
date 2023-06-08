import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import List from "./components/List/List";
import Search from "./components/Search/Search";
import AppRouter from "./components/AppRouter/AppRouter";

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
        <div>
            <Link to="/" data-testid="main-link">
                main
            </Link>
            <Link to="/about" data-testid="about-link">
                about
            </Link>
            <Link to="/users" data-testid="users-link">
                users
            </Link>
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
            <AppRouter/>
        </div>
    );
}

export default App;
