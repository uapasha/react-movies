import React from 'react';


//const submitUrl="/api/v1/movies/";
const submitUrl="https://react-movies-uapasha-c9.c9users.io/api/v1/movies/";

export default class MovieForm extends React.Component{
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

    handleMovieSubmit(movie) {
        fetch(submitUrl, {
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
        this.handleMovieSubmit(movie);
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