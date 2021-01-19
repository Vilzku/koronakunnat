import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function WeeklyGraph(props) {
    let weeklyHcdCases = props.selectedCity.weeklyHcdCases;
    let dps = [];
    let week = 1;


    console.log(weeklyHcdCases);
    
        for(let i in weeklyHcdCases) {
            if(weeklyHcdCases[i] === undefined) {
                continue;
            }
            /*console.log({x: weeklyHcdCases[i], y: week});*/
           
            dps.push({x: parseInt(++i), y: parseInt(weeklyHcdCases[i])})
        
            week++;
            
        }
        dps.pop()
    
      
        console.log(JSON.stringify(dps));

    const options = {
        theme: "dark2",
        backgroundColor: "#162447",
        animationEnabled: true,
        exportEnabled: false,
        title:{
            text: "SHP viikottaiset tartunnat",
            fontColor: "#e43f5a"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            color: "#e43f5a",
            fillOpacity: 0.9,
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            xValueFormatString: "Viikko #",
            yValueFormatString: "#### Tapausta",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: dps
        }]
    }

    return (
        <div className="CumulativeGraph">

            <CanvasJSChart options = {options} />

		</div>
    );
}

export default WeeklyGraph;