import React from 'react'
import { render } from 'react-dom'
import MoviesBox from './MoviesBox.jsx'
render(<MoviesBox url="http://localhost:3000/api/v1/movies/page/"
                  submitUrl="http://localhost:3000/api/v1/movies/"
                  deleteUrl="http://localhost:3000/api/v1/movies/delete/"/>,
    document.getElementById('content'));

