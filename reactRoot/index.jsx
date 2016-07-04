import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import MoviesBox from './components/MoviesBox.jsx';
import MovieForm from './components/individualItems/MovieForm.jsx';
import FileUpload from './components/individualItems/FileUpload.jsx';
import MoviesLogic from "./components/MoviesLogic.jsx";
import SearchMovies from "./components/individualItems/SearchMovies.jsx";


render((
        <Router history={hashHistory}>
            <Route path="/" component={MoviesBox}>
                <Route path="/new" component = {MovieForm}/>
                <Route path="/upload" component={FileUpload}/>
                <Route path="/movies" component={MoviesLogic}/>
                <Route path="/search" component={SearchMovies}/>
            </Route>
        </Router>
    ),document.getElementById('content'));

