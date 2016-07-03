////// MOVIES BOX ////////////

class MoviesBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page:1
        }
    }

    fetchData() {
        $.ajax({
            url: this.props.url + this.state.page + '/',
            dataType: 'json',
            cache: false,
            success: function(data) {
                let allMovies = this.state.data.concat(data.movies);
                this.setState({data: allMovies});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount(){
        this.fetchData()
    }
    handleMovieSubmit(movie) {
        $.ajax({
            url: this.props.submitUrl,
            dataType: 'json',
            type: 'POST',
            data: movie,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="moviesBox">
                Hello, world! We are the movies.
                <MoviesList data={this.state.data.movies ? this.state.data.movies : this.state.data}/>
                <MovieForm onMovieSubmit={this.handleMovieSubmit.bind(this)}/>
            </div>
        );
    }
}

////// MOVIES LIST ////////////

class MoviesList extends React.Component{

    renderMovies(){
        if (this.props.data.length === 0) return <p className = 'message'>Movies are loading</p>;
        return this.props.data.map((movie)=>{
            return<Movie movie = {movie} key={movie._id}>
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
    renderStars(){
        if (this.props.movie.stars && this.props.movie.stars.length>0){
            return <ul className="movieStars">
                <h2>Stars:</h2>
                {this.props.movie.stars.map((star) => {
                    return <li>{star}</li>
                })}
                </ul>
        } else return<p className="message">No stars are provided</p>
    }
    render(){
        return<div className="movie">
            <h2 className='movieTitle'>
                {this.props.movie.title}
            </h2>
            <p>Year:
                <strong>
                    {this.props.movie.year ? this.props.movie.year :
                        <strong className="message">
                            {'Year of release is unknown'}
                        </strong>
                    }
                </strong>
            </p>
            <p>Format:
                <strong>
                    {this.props.movie.format ? this.props.movie.format :
                        <strong className="message">
                            {'No format provided'}
                        </strong>}
                </strong>
            </p>
        </div>
    }
}

////// Add movie form /////////

class MovieForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            year:'2016',
            format:'',
            newStar:'',
            stars:[]
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleStarChange = this.handleStarChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addStar = this.addStar.bind(this);
    }

    addStar(e){
        e.preventDefault();
        let newStars = this.state.stars.concat(this.state.newStar.trim());
        this.setState({
            stars: newStars,
            newStar: ''
        });
   }

    handleTitleChange(e){
        this.setState({
            title: e.target.value
        });
    }

    handleYearChange(e){
        this.setState({
            year: e.target.value
        })
    }

    handleFormatChange(e){
        this.setState({
            format: e.target.value
        })
    }
    handleStarChange(e){
        this.setState({
            newStar: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let title = this.state.title.trim();
        let year = this.state.year.trim();
        let format = this.state.format.trim();
        let stars = this.state.stars;
        let movie = {title: title, year: year, format: format, stars: stars};
        this.props.onMovieSubmit(movie);
        // TODO: send request to the server
        this.setState({
            title: '',
            year: '2016',
            format:'',
            stars: [],
            newStar: ''
        });
    }

    renderAddStars(){
        let numForKey = 0;
        return <div className="newMovieStars">
            {this.state.stars.length === 0 ? <p className="message">No stars added</p> : <h2>Stars Added:</h2>}
            {this.state.stars.map((star)=> {
                numForKey += 1;
                return <div key={"star_" + numForKey} className="newStar">
                    <p>{star}</p>
                </div>
            })
            }
            <input
                type="text"
                placeholder="Enter new star name"
                onChange={this.handleStarChange}
                value={this.state.newStar}/>
            <button onClick={this.addStar}>Add star</button>
        </div>
    }

    render(){
        return<form className="movieForm" onSubmit={this.handleSubmit}>
            <input type="text"
                   placeholder="New Movie name"
                   required
                   value={this.state.title}
                   onChange={this.handleTitleChange}/>
            <label>Add year
                <input type="number"
                       name="year"
                       min="1896"
                       max={new Date().getFullYear() + 5}
                       value={this.state.year}
                       onChange={this.handleYearChange}
                />
            </label>
            <input type="text" placeholder="Enter movie format"
                   value={this.state.format} onChange={this.handleFormatChange}/>
            {this.renderAddStars()}
            <input type="submit" value="Add Movie" />
        </form>
    }

}

////// Render ////////////

ReactDOM.render(
<MoviesBox url="http://localhost:3000/api/v1/movies/page/" submitUrl="http://localhost:3000/api/v1/movies/"/>,
    document.getElementById('content')
);