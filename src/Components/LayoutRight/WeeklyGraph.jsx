import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function WeeklyGraph(props) {

    const selectedCity = props.selectedCity;
    if(!selectedCity) return(<div className="WeeklyGraph"></div>);

    let options = setup();

    function setup() {
        let weeklyHcdCases = selectedCity.weeklyHcdCases;

        let dps = [];
        for(let i in weeklyHcdCases) {
            if(weeklyHcdCases[i] === undefined && i > 50) continue;
            if(weeklyHcdCases[i] === undefined) weeklyHcdCases[i] = 0;

            dps.push({x: parseInt(++i), y: parseInt(weeklyHcdCases[i])})
        }
        dps.pop()
    
        const options = {
            theme: "dark2",
            backgroundColor: "#162447",
            animationEnabled: true,
            exportEnabled: false,
            height: 430,
            title:{
                fontColor: "#e43f5a"
            },
            axisX:{
                title: "Viikot",
                titleFontColor: "#e43f5a",
                labelFontColor: "#e43f5a",
                lineColor: "#e43f5a",
                tickColor: "#525252"
            },
            axisY: {
                includeZero: true,
                gridColor: "#525252",
                tickColor: "#525252",
                labelFontColor: "#e43f5a"
            },
            data: [{
                color: "#e43f5a",
                fillOpacity: 0.8,
                type: "column",
                xValueFormatString: "Viikko #",
                yValueFormatString: "0 Tapausta",
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dps
            }]
        }
        return options;
    }

    return (
        <div className="WeeklyGraph">
            <div className="container">
                <h1>SHP:n viikoittaiset tapaukset</h1>
                <CanvasJSChart options = {options} />
            </div>
		</div>
    );
}

export default WeeklyGraph;