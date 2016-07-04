import React from 'react';

import { Link } from 'react-router'
import NavLink from './NavLink.jsx'

export default class MoviesBox extends React.Component{

    render() {
        return (
            <div className="moviesBox">
                <ul role="nav">
                    <li><Link to="/" activeClassName="active">>Home</Link></li>
                    <li><NavLink to="/new" activeClassName="active">>New Movie</NavLink></li>
                    <li><NavLink to="/upload" activeClassName="active">>Upload file with movies</NavLink></li>
                    <li><NavLink to="/movies" activeClassName="active">>Movies</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}