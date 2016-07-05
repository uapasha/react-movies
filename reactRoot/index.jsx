import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import MoviesBox from './containers/MoviesBox.jsx';
import MovieForm from './individualItems/MovieForm.jsx';
import FileUpload from './individualItems/FileUpload.jsx';
import MoviesMain from "./containers/MoviesMain.jsx";
import SearchMovies from "./individualItems/SearchMovies.jsx";
import Welcome from "./individualItems/Welcome.jsx"


render((
        <Router history={hashHistory}>
            <Route path="/" component={MoviesBox}>
                <Route path="/home" component = {Welcome}/>
                <Route path="/new" component = {MovieForm}/>
                <Route path="/upload" component={FileUpload}/>
                <Route path="/movies" component={MoviesMain}/>
                <Route path="/search" component={SearchMovies}/>
            </Route>
        </Router>
    ),document.getElementById('content'));

