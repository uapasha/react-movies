import React from 'react';

import MoviesList from '../containers/MoviesList.jsx';

const searchUrl = "/api/v1/movies/search/";
//const searchUrl='https://react-movies-uapasha-c9.c9users.io/api/v1/movies/search/';

export default class SearchMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            query: ''
        };
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //render movies based on deletion feedback
    reRender(movieId) {
        let newData = this.state.data.filter((movie)=> movie._id != movieId);
        this.setState({
            data: newData,
            found: true
        })
    }

    fetchData() {
        const url = searchUrl + this.state.query;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.movies.length === 0) {

                    this.setState({
                        data: responseData,
                        found: false
                    });

                } else {
                    this.setState({
                        data: responseData,
                        found: true
                    });
                }
            })
            .catch((error) => console.error(error));

    }

    handleSubmit(e) {
        e.preventDefault();
        this.fetchData();
        this.setState({
            query: ''
        });
    }

    handleQueryChange(e) {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form className="movieSearch" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Enter movie title or name of the Star"
                           value={this.state.query} onChange={this.handleQueryChange}/>
                    <input type="submit" value="Search Movie by title or actor"/>
                </form>
                <MoviesList reRender={this.reRender.bind(this)}
                            data={this.state.data.movies ? 
                                this.state.data.movies : 
                                this.state.data}
                            search={true}/>
                {this.state.found ?
                    '' :
                    <p className="message">Nothing found</p>
                }
            </div>
        );
    }

}