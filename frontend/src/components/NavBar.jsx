import React from "react";
import { Link } from "react-router-dom";

const NavBar = (user, setUser) => {
return (
    <nav className="bg-teal-500 p-4 text-white">
        <div>
            <Link to="/" className="text-white text-lg font-bold">
                Home
            </Link>
        </div>
    </nav>
)
};

export default NavBar;