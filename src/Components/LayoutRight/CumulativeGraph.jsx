import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];

function CumulativeGraph(props) {
    let weeklyHcdCases = props.selectedCity.weeklyHcdCases;
    /*if(!selectedCity) return (<div className="CumulativeGraph"></div>)*/
    /*let weeklyHcdCases = props.weeklyHcdCases;*/
    var week = 1;
    /*console.log(selectedCity.area);*/
    console.log(dps);
    console.log(weeklyHcdCases);
    for(let i in weeklyHcdCases) {
        dps.push({x: weeklyHcdCases, y: week})
        i++;
        week++;
        
    }
    week++;
    console.log(week);
    /*dps.push({x: 1, y:2})*/
    
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