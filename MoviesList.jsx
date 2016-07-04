import React from 'react';
import Movie from './Movie.jsx';
import FileUpload from './FileUpload.jsx'

export default class MoviesList extends React.Component{
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
            <FileUpload fileUploadUrl = {this.props.fileUploadUrl}/>
        </div>
    }
}