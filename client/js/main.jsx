let data = [
        {"_id":"5778ac833d1c86241de6dcc7","title":"Casablanca",
            "year":1942,"format":"DVD","__v":0,
            "stars":[
                "Humphrey Bogart","Ingrid Bergman","Claude Rains",
                "Peter Lorre"
            ]
        },
        {"_id":"5778ac833d1c86241de6dcdd","title":"Harvey",
            "year":1950,"format":"DVD","__v":0,
            "stars":[
                "James Stewart","Josephine Hull","Peggy Dow",
                "Charles Drake"]}];


////// MOVIES BOX ////////////

class MoviesBox extends React.Component{
    render() {
        return (
            <div className="moviesBox">
                Hello, world! We are the movies.
                <MoviesList data={this.props.data}/>
            </div>
        );
    }
}

////// MOVIES LIST ////////////

class MoviesList extends React.Component{

    renderMovies(){
        return this.props.data.map((movie)=>{
            return<Movie title = {movie.title} key={movie._id}>
                Movie Format: {movie.format}
            </Movie>
        })
    }

    render(){
        return <div className="moviesList">
            {this.renderMovies()}
        </div>
    }
}



////// Single movie ////////////
class Movie extends React.Component{
    render(){
        return<div className="movie">
            <h2 className='movieTitle'>
                {this.props.title}
            </h2>
            {this.props.children}
        </div>
    }
}

////// Render ////////////

ReactDOM.render(
<MoviesBox data = {data}/>,
    document.getElementById('content')
);