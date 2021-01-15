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

    return (
        <div className="LargeStats">

            <div className="cases">
            <span className="number">{ hcdList.length > 0 ? hcdList[14].cases : "" }</span>
            <p className="title">Tapaukset</p>
            </div>

            <div className="vaccinations">
            <span className="number">{ vaccinations.length > 0 ? vaccinations[0].shots : "--"}</span>
            <p className="title">Rokotukset</p>
            </div>

        </div>
    );
}

export default LargeStats;