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
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title:{
            text: "SHP viikottaiset tartunnat"
        },
        axisY: {
            includeZero: true
        },
        data: [{
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