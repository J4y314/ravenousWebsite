import React, { useState } from 'react';
import Yelp from '../../util/Yelp';
import BusinessList from '../BusinessList/BusinessList'
import SearchBar from '../SearchBar/SearchBar'
import Subscription from '../Subscription/Subscription'
import Footer from '../Footer/Footer'

const HomePage = () => {

    const [businesses, setBusinesses] = useState([]);

    const searchYelp = (term, location, sortBy) => {
        console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
        Yelp.search(term, location, sortBy)
        .then((newBusinesses) => setBusinesses(newBusinesses))
    };

    return ( 
        <>
            <SearchBar searchYelp={searchYelp}/>
            <BusinessList businesses={businesses} />
            <Subscription />
            <Footer />
        </>
    );
}
 
export default HomePage;