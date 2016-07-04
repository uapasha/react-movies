import React from 'react';
import MovieForm from './MovieForm.jsx';
import MoviesList from './MoviesList.jsx';


export default class MoviesBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page:1,
            noMoreMovies:false
        };
    }

    fetchData() {
        const url = this.props.url + this.state.page + '/';
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
        // $.ajax({
        //     url: url,
        //     dataType: 'json',
        //     cache: false,
        //     success: function(data) {
        //         if (data.movies.length == 0 || data.movies.length < 20){
        //             this.setState({
        //                 noMoreMovies: true
        //             })
        //         }
        //
        //         let allMovies = this.state.data.concat(data.movies);
        //
        //         this.setState({
        //             data: allMovies,
        //             page:this.state.page + 1
        //         });
        //
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    }

    componentDidMount(){
        this.fetchData()
    }
    handleMovieSubmit(movie) {
        fetch(this.props.submitUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
            })
        .catch((error) => console.error(error));

        //TODO optimistic updates ??
    }

    render() {
        return (
            <div className="moviesBox">
                Hello, world! We are the movies.
                <MoviesList data={this.state.data.movies ? this.state.data.movies : this.state.data}
                            deleteUrl = {this.props.deleteUrl} fileUploadUrl = {this.props.fileUploadUrl}/>
                <MovieForm onMovieSubmit={this.handleMovieSubmit.bind(this)}/>
                {this.state.noMoreMovies ?
                    <p className="message">No more movies to load</p> :
                    <button onClick={this.fetchData.bind(this)}>Load More</button>}
            </div>
        );
    }
}