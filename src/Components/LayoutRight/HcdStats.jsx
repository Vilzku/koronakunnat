import React from 'react';

function HcdStats(props) {

    if(!props.selectedHcd) return(<div className="HcdStats"></div>);

    const selectedHcd = props.selectedHcd;

    function calculateChange() {
        let lastWeeks = ["0", "0"];
        for(let i in selectedHcd.weeklyCases) {
            if(i>50 && !selectedHcd.weeklyCases[i]) break;
            lastWeeks.shift();
            lastWeeks.push(selectedHcd.weeklyCases[i]);
        }
        if(lastWeeks[0] === "..") lastWeeks[0] = '0';
        if(lastWeeks[1] === "..") lastWeeks[1] = '0';
        return parseInt(lastWeeks[0]) + parseInt(lastWeeks[1])
    }
    
    let change = calculateChange();

    return (
        <div className="HcdStats">
            <h1>{ selectedHcd.area }</h1>
            <h2>{ selectedHcd.weeklyCases[105] } tartuntaa</h2>
            <h2>{ change } uutta tartuntaa</h2>
            <p>edellisen viikon alusta</p>
        </div>
    );
}

export default HcdStats;