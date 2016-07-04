import React from 'react';

import MoviesList from './MoviesList.jsx';

const getPageUrl="http://localhost:3000/api/v1/movies/page/";

export default class MoviesLogic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page:1,
            noMoreMovies:false
        };
    }

    fetchData() {
        const url = getPageUrl + this.state.page + '/';
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.movies.length == 0 || responseData.movies.length < 20){
                    this.setState({
                        noMoreMovies: true
                    })
                }
                let allMovies = this.state.data.concat(responseData.movies);

                this.setState({
                    data: allMovies,
                    page:this.state.page + 1
                });
            })
            .catch((error) => console.error(error));

    }

    componentDidMount(){
        this.fetchData()
    }

    render() {
        return (
            <div>
                <MoviesList data={this.state.data.movies ? this.state.data.movies : this.state.data}/>
                {this.state.noMoreMovies ?
                    <p className="message">No more movies to load</p> :
                    <button onClick={this.fetchData.bind(this)}>Load More</button>}
                <ul role="nav">
                </ul>
            </div>
        );
    }
}