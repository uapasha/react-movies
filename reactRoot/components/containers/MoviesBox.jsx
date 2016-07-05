import React from 'react';

import NavLink from '../individualItems/NavLink.jsx'

export default class MoviesBox extends React.Component {

    render() {
        return (
            <div className="moviesBox">
                <ul role="nav">
                    <li><NavLink to="/movies">Movies</NavLink></li>
                    <li><NavLink to="/search">Search Movies</NavLink></li>
                    <li><NavLink to="/new">New Movie</NavLink></li>
                    <li><NavLink to="/upload">Upload file with movies</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}