import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function WeeklyGraph(props) {

    if(!props.selectedCity) return(<div className="WeeklyGraph"></div>);

    function setup() {
        let weeklyHcdCases = props.selectedCity.weeklyHcdCases;

        let dps = [];
        for(let i in weeklyHcdCases) {
            if(weeklyHcdCases[i] === undefined) continue;
            dps.push({x: parseInt(++i), y: parseInt(weeklyHcdCases[i])})
        }
        dps.pop()
    
        const options = {
            theme: "dark2",
            backgroundColor: "#162447",
            animationEnabled: true,
            exportEnabled: false,
            title:{
                text: "SHP viikottaiset tartunnat",
                fontColor: "#e43f5a"
            },
            axisX:{
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
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                xValueFormatString: "Viikko #",
                yValueFormatString: "#### Tapausta",
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dps
            }]
        }
        return options;
    }
    
    let options = setup()

    return (
        <div className="WeeklyGraph">

            <CanvasJSChart options = {options} />

		</div>
    );
}

export default WeeklyGraph;