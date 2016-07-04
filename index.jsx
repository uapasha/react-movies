import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import MoviesBox from './MoviesBox.jsx'
import MovieForm from './MovieForm.jsx';
import FileUpload from './FileUpload.jsx'
import MoviesLogic from "./MoviesLogic.jsx"


render((
        <Router history={hashHistory}>
            <Route path="/" component={MoviesBox}>
                <Route path="/new" component = {MovieForm}/>
                <Route path="/upload" component={FileUpload}/>
                <Route path="/movies" component={MoviesLogic}/>
            </Route>
        </Router>
    ),document.getElementById('content'));

