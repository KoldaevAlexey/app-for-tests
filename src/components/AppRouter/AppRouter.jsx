import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AboutPage from "../../pages/AboutPage";
import MainPage from "../../pages/MainPage";
import NotFound from "../../pages/NotFound";
import Users from "../../components/Users/Users";
import UserDetailsPage from "../../pages/UserDetailsPage";

const AppRouter = () => {
    return (
         <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetailsPage />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
    )
}            
            
export default AppRouter;           