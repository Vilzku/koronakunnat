import React from 'react';

function LargeStats(props) {

    let hcdList = props.hcdList;
    let vaccinations = props.vaccinations;
    console.log(hcdList)


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