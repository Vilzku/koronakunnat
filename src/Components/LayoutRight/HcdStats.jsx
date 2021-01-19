import React from 'react';

function HcdStats(props) {

    if(!props.selectedCity) return(<div className="HcdStats"></div>);

    const selectedCity = props.selectedCity;

    return (
        <div className="HcdStats">
            <h1>{ selectedCity.hcd }</h1>
            <h2>{ selectedCity.weeklyHcdCases[105] } tartuntaa</h2>
        </div>
    );
}

export default HcdStats;