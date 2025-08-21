import {React, useState, useEffect} from "react";
import './SearchBar.css'

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};


function SearchBar(props){
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState("");
    const [sortBy, setSort] = useState('best_match');
    const getSortByClass = (sortByOption) => sortBy === sortByOption ? 'active' : '';

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleSortChange = (sortByOption) => {
        setSort(sortByOption);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        props.searchYelp(term, location, sortBy);
    }

    const renderSortByOptions = () => Object.keys(sortByOptions).map((sortByOption) => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return (
            <li className={getSortByClass(sortByOptionValue)}
                key={sortByOptionValue}
                onClick={() => handleSortChange(sortByOptionValue)}>
                    {sortByOption}
            </li>
        );
    });

    return (
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input onChange={handleTermChange} placeholder="Search Businesses" />
                <input onChange={handleLocationChange} placeholder="Where?" />
            </div>
            <div className="SearchBar-submit">
                <a href='www.#.com' onClick={handleSearch}>Let's Go</a>
            </div>
        </div>
    )
}

export default SearchBar
