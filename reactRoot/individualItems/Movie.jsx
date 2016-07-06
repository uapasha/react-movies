import React from 'react';

const deleteUrl = "/api/v1/movies/delete/";
//const deleteUrl = "https://react-movies-uapasha-c9.c9users.io/api/v1/movies/delete/";

export default class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMore: false
        };

        this.handleMovieRemove = this.handleMovieRemove.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
    }

    handleShowMore() {
        this.setState({
            showMore: !this.state.showMore
        })
    }

    handleMovieRemove() {

        fetch(deleteUrl + this.props.movie._id, {
            method: 'DELETE',
        })
            .then(this.props.reRender(this.props.movie._id))
            .catch((error) => console.error(error));
    }

    renderShortDescription() {
        return <div className="movie">
            <h2 className='movieTitle'>
                {this.props.movie.title}
            </h2>

            <button onClick={this.handleShowMore}>Show Info</button>
        </div>
    }

    renderMoreData() {
        return <div className="movie">
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
            <button onClick={this.handleShowMore}>Hide Info</button>
            <button onClick={this.handleMovieRemove}>Remove movie</button>
        </div>
    }

    renderStars() {
        if (this.props.movie.stars && this.props.movie.stars.length > 0) {
            let numForKey = 0;

            return <ul className="movieStars">

                <h3>Stars:</h3>
                {this.props.movie.stars.map((star) => {
                    numForKey += 1;
                    return <li key={star + "_" + numForKey}>{star}</li>
                })}
            </ul>
            
        } else return <p className="message">No stars are provided</p>
    }

    render() {
        return this.state.showMore ?
            this.renderMoreData() :
            this.renderShortDescription()
    }
}