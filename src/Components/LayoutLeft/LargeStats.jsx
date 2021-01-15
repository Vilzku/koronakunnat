import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function LargeStats(props) {

    let hcdList = props.hcdList;
    let vaccinations = props.vaccinations;

    // Loading icon
    if(hcdList.length === 0 || vaccinations.length === 0) {
        return (
            <div className="LargeStats">
                <FontAwesomeIcon icon={faSpinner} className="LoadIcon" />
            </div>
        );
    }

    // Date for vaccination tooltip
    let date;
    if(vaccinations.length > 0) {
        date = new Date(vaccinations[0].date);
        date = date.getUTCDate() + "." + (date.getUTCMonth()+1) + "." + date.getUTCFullYear();
    } else {
        date = "2021"

    }

    return (
        <div className="LargeStats">

            <div className="cases">
            <span className="number">{ hcdList.length > 0 ? hcdList[14].cases : "" }</span>
            <div className="title">Tapaukset</div>
            </div>

            <div className="vaccinations">
            <span className="number">{ vaccinations.length > 0 ? vaccinations[0].shots : "--"}</span>
            <div className="title">Rokotukset</div>
            <div className="tooltip">?
                <span className="tooltiptext">Helsingin Sanomat { date }</span>
            </div>
            </div>

        </div>
    );
}

export default LargeStats;