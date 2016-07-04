////// MOVIES BOX ////////////

class MoviesBox extends React.Component{
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

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                if (data.movies.length == 0 || data.movies.length < 20){
                    this.setState({
                        noMoreMovies: true
                    })
                }

                let allMovies = this.state.data.concat(data.movies);

                this.setState({
                    data: allMovies,
                    page:this.state.page + 1
                });

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

        //TODO optimistic updates ??
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
                <MoviesList data={this.state.data.movies ? this.state.data.movies : this.state.data}
                            deleteUrl = {this.props.deleteUrl}/>
                <MovieForm onMovieSubmit={this.handleMovieSubmit.bind(this)}/>
                {this.state.noMoreMovies ?
                    <p className="message">No more movies to load</p> :
                    <button onClick={this.fetchData.bind(this)}>Load More</button>}
            </div>
        );
    }
}

////// MOVIES LIST ////////////

class MoviesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortDirection: 'asc',
            sortDirectionMethods: ["asc", "desc"],
            sortBy: 'title',
            sortByMethods: ['year', 'title', 'format'],
            data: this.props.data
        };
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleSortDirectionMethods = this.handleSortDirectionMethods.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
        this.sort(nextProps)
    }

    handleSortByChange(e){

        this.setState({
            sortBy: e.target.value
        });
        this.sort(null, e.target.value);

    }


    handleSortDirectionMethods(e){
        this.setState({
            sortDirection: e.target.value,
        });
        this.sort();

    }

    sort(nextProps, sortBy){
        var sortAsc, sortDesc;
        let sortCriterium = this.state.sortBy;
        if (!!sortBy && sortCriterium !== sortBy){
            sortCriterium =  sortBy;
        }
        switch (sortCriterium){
            case "year" :
                sortAsc  = (a, b) => parseInt(a.year, 10) - parseInt(b.year, 10);
                sortDesc = (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10);
                break;
            case "format":
                sortAsc  = function(a, b){
                    if(a.format > b.format){
                        return 1
                    } else if(a.format < b.format) {
                        return -1
                    } else return 0};
                sortDesc = function(a, b){
                    if(a.format < b.format){
                        return 1
                    } else if(a.format > b.format) {
                        return -1
                    } else return 0};
                break;
            default:
                sortAsc  = function(a, b){
                    if(a.title > b.title){
                        return 1
                    } else if(a.title < b.title) {
                        return -1
                    } else return 0};
                sortDesc = function(a, b){
                    if(a.title < b.title){
                        return 1
                    } else if(a.title > b.title) {
                        return -1
                    } else return 0};
        }

        if(!!nextProps){
            this.setState({
                data: nextProps.data.sort(this.state.sortDirection === 'asc' ? sortAsc: sortDesc),
            });
        } else {
            this.setState({
                data: this.state.data.sort(this.state.sortDirection === 'asc' ? sortDesc: sortAsc),
            })
        }

    }

    renderMovies(){
        if (this.state.data.length === 0) return <p className = 'message'>Movies are loading</p>;
        return this.state.data.map((movie)=>{
            return<Movie movie = {movie} key={movie._id} deleteUrl = {this.props.deleteUrl}>
            </Movie>
        })
    }

    render(){
        return <div className="moviesList">
            <select name="changeSortBy" onChange={this.handleSortByChange} value={this.state.sortBy}>
                {this.state.sortByMethods.map((method)=>{
                    return<option key={"select" + method} value={method}>
                        {method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()}
                    </option>
                })}
            </select>
            <select name="changeSortBy" onChange={this.handleSortDirectionMethods}
                    value={this.state.sortDirection}>
                {this.state.sortDirectionMethods.map((method)=>{
                    return<option key={"select" + method} value={method}>
                        {method=='asc' ? "Ascending" : "Descending"}
                    </option>
                })}
            </select>
            {this.renderMovies()}
            <FileUpload/>
        </div>
    }
}



////// Single movie ////////////
class Movie extends React.Component{
    constructor(props){
        super(props);
        this.handleMovieRemove = this.handleMovieRemove.bind(this);
    }

    handleMovieRemove(){
        $.ajax({
            url: this.props.deleteUrl + this.props.movie._id,
            type: 'DELETE',
            success: function (res) {

                // TODO reconsder this approach
                if (res.status && res.status === 'ok'){
                    location.reload()
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    
    renderStars(){
        if (this.props.movie.stars && this.props.movie.stars.length>0){
            let numForKey = 0;
            return <ul className="movieStars">
                <h2>Stars:</h2>
                {this.props.movie.stars.map((star) => {
                    numForKey += 1;
                    return <li key={star + "_" + numForKey}>{star}</li>
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
            {this.renderStars()}
            <button onClick={this.handleMovieRemove}>Remove movie</button>
        </div>
    }
}


////// File upload form ///////
class FileUpload extends React.Component{
    
    uploadFile(e) {
        e.preventDefault()
        console.log(ReactDOM.findDOMNode(this.refs.file));
        var fd = new FormData();    
        fd.append( 'moviesFile', ReactDOM.findDOMNode(this.refs.file).files[0] );
    
        $.ajax({
            url: 'https://react-movies-uapasha-c9.c9users.io/api/v1/movies/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                alert(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    }

    render(){
        return<fieldset className="uploader">
            <legend>Upload File</legend>
            <form ref="uploadForm"
                 encType="multipart/form-data"
                 onSubmit={this.uploadFile.bind(this)}>
                    <input ref="file" type="file" name="moviesFile" className="upload-file"/>
                    <input type="submit" value="Upload File" name="submit"/>
            </form>
        </fieldset>
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
<MoviesBox url="https://react-movies-uapasha-c9.c9users.io/api/v1/movies/page/" 
          submitUrl="https://react-movies-uapasha-c9.c9users.io/api/v1/movies/" 
          deleteUrl="https://react-movies-uapasha-c9.c9users.io/api/v1/movies/delete/"/>,
    document.getElementById('content')
);

// ReactDOM.render(
// <MoviesBox url="http://localhost:3000/api/v1/movies/page/" 
//           submitUrl="http://localhost:3000/api/v1/movies/" 
//           deleteUrl="http://localhost:3000/api/v1/movies/delete/"/>,
//     document.getElementById('content')
// );