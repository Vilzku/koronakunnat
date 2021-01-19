import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function CumulativeGraph(props) {
    let weeklyHcdCases = props.selectedCity.weeklyHcdCases;
    /*if(!selectedCity) return (<div className="CumulativeGraph"></div>)*/
    /*let weeklyHcdCases = props.weeklyHcdCases;*/
    let dps = [];
    let week = 1;
    let sum = 0;
    /*console.log(selectedCity.area);*/
    
    console.log(weeklyHcdCases);
    
        for(let i in weeklyHcdCases) {
            if(weeklyHcdCases[i] === undefined) {
                continue;
            }
            /*console.log({x: weeklyHcdCases[i], y: week});*/
            sum += parseInt(weeklyHcdCases[i])
            dps.push({x: parseInt(week), y: parseInt(sum)})
        
            week++;
            
        }
        dps.pop()
    
      
        console.log(JSON.stringify(dps));
    
    
    
    
    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
            
            text:  "SHP korona tapaukset"
        },

        axisX:{
            reversed: false
        },
        axisY: {
            title: ""
        },
        data: [
        {
            type: "area",
            xValueFormatString: "Viikko #",
            yValueFormatString: "#### Tapausta",
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