import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import MoviesBox from './Components/containers/MoviesBox.jsx';
import MovieForm from './Components/individualItems/MovieForm.jsx';
import FileUpload from './Components/individualItems/FileUpload.jsx';
import MoviesMain from "./Components/containers/MoviesMain.jsx";
import SearchMovies from "./Components/individualItems/SearchMovies.jsx";
import Welcome from "./Components/individualItems/Welcome.jsx"


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

