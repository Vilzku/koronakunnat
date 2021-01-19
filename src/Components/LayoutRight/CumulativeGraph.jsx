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
            dps.push({x: parseInt(++i), y: parseInt(sum)})
        
            week++;
            
        }
        dps.pop()
    
      
        console.log(JSON.stringify(dps));
    
    
    
    
    const options = {
        theme: "dark2",
        backgroundColor: "#162447",
        animationEnabled: true,
        exportEnabled: false,
        title: {
            text:  "SHP korona tapaukset",
            fontColor: "#e43f5a"
        },

        axisX:{
            reversed: false,
            tickColor: "#525252",
            labelFontColor: "#e43f5a",
            lineColor: "#525252"
        },
        axisY: {
            title: "",
            gridColor: "#525252",
            tickColor: "#525252",
            labelFontColor: "#e43f5a"
        },
        data: [
        {
            color: "#e43f5a",
            fillOpacity: 0.4,
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