import React from 'react';
import {Link} from "react-router-dom";

const Homepage = () =>(
    <div className="home-hero">
        <h1>???</h1>
        <h4>new to warbler</h4>
        <Link to="/signup" className="btn btn-primary">
            Sign up here
        </Link>
    </div>
);

export default Homepage;