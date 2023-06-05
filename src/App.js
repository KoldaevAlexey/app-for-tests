import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import List from "./components/List/List";
import Search from "./components/Search/Search";
import AboutPage from "./pages/AboutPage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import Users from "./components/Users/Users";
import UserDetailsPage from "./pages/UserDetailsPage";

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
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetailsPage />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
