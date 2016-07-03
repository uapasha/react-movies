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
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    fetchData() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount(){
        this.fetchData()
    }

    render() {

        return (
            <div className="moviesBox">
                Hello, world! We are the movies.
                <MoviesList data={this.state.data.movies ? this.state.data.movies : this.state.data}/>
                <MovieForm/>
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
        console.log(movie);
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
<MoviesBox data = {data} url="http://localhost:3000/api/v1/movies/"/>,
    document.getElementById('content')
);