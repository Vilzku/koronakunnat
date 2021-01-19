import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function WeeklyGraph(props) {
    let weeklyHcdCases = props.selectedCity.weeklyHcdCases;
    let dps = [];
    let week = 1;


    
    
        for(let i in weeklyHcdCases) {
            if(weeklyHcdCases[i] === undefined) {
                continue;
            }
           
           
            dps.push({x: parseInt(++i), y: parseInt(weeklyHcdCases[i])})
        
            week++;
            
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

    return (
        <div className="CumulativeGraph">

            <CanvasJSChart options = {options} />

		</div>
    );
}

export default WeeklyGraph;