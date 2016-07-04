import React from 'react';

export default class Movie extends React.Component{
    constructor(props){
        super(props);
        this.handleMovieRemove = this.handleMovieRemove.bind(this);
    }

    handleMovieRemove(){

        fetch(this.props.deleteUrl + this.props.movie._id, {
            method: 'DELETE',
        })
        .catch((error) => console.error(error));
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