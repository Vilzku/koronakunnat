import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];
var week = 1;
function CumulativeGraph(props) {
    let selectedCity = props.selectedCity;
    /*if(!selectedCity) return (<div className="CumulativeGraph"></div>)*/
    let weeklyHcdCases = props.weeklyHcdCases;
    
    /*console.log(selectedCity.area);*/
    console.log(dps)
    for(let i in weeklyHcdCases) {
        dps.push({x: 1, y:2})
        dps.push({x: weeklyHcdCases, y: week})
        i++;g
        week++;
        console.log(dps);
    }
    dps.push({x: 1, y:2})
    
    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
            
            text:  "Kunnan korona tapaukset"
        },
        axisY: {
            title: "Tapaukset viikottain"
        },
        data: [
        {
            type: "area",
            xValueFormatString: "Viikko #",
            yValueFormatString: "### Tapausta",
            dataPoints: dps
              
        }
        ]
    }

    
    
    return (
        <div className="CumulativeGraph">

            <CanvasJSChart options = {options} />

		</div>
    );
}

export default CumulativeGraph;