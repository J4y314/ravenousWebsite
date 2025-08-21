import React from "react";
import './BusinessList.css';
import Business from "../Business/Business";

function BusinessList({businesses}){
    return(
        <div className="BusinessList">
            {
                businesses.map((business) =>{
                    return <Business key={business.id} business={business}/>;
                })
            }
        </div>
    );
}

export default BusinessList