import React from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import '../NavBar/NavBar.css';


const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">                   
                    <Link className="navbar-brand" to={"/"}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png" alt="newbalance_logo" width={100} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/category/tenis">Tenis</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/category/camiseta">Camiseta</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/category/short">Short</NavLink>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart"><CartWidget /></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar