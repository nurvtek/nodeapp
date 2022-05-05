// radar.js
 
var chart = new ej.charts.Chart({
    //Initializing Primary X Axis
    primaryXAxis: {
        valueType: "Category",
        labelPlacement: "OnTicks",
        interval: 1,
    },
    //Initializing Primary Y Axis
    primaryYAxis: {
        minimum: -25,
        maximum: 25,
        interval: 10,
        edgeLabelPlacement: "Shift",
        labelFormat: "{value}°C"
    },
    //Initializing Chart Series
    series: [
        {
            type: "Radar",
            dataSource: [
                { x: "Jan", y: -7.1 },
                { x: "Feb", y: -3.7 },
                { x: "Mar", y: 0.8 },
                { x: "Apr", y: 6.3 },
                { x: "May", y: 13.3 },
                { x: "Jun", y: 18.0 },
                { x: "Jul", y: 19.8 },
                { x: "Aug", y: 18.1 },
                { x: "Sep", y: 13.1 },
                { x: "Oct", y: 4.1 },
                { x: "Nov", y: -3.8 },
                { x: "Dec", y: -6.8 }
            ],
            xName: "x",
            width: 2,
            yName: "y",
            name: "Warmest",
        },
        {
            type: "Radar",
            dataSource: [
                { x: "Jan", y: -17.4 },
                { x: "Feb", y: -15.6 },
                { x: "Mar", y: -12.3 },
                { x: "Apr", y: -5.3 },
                { x: "May", y: 1.0 },
                { x: "Jun", y: 6.9 },
                { x: "Jul", y: 9.4 },
                { x: "Aug", y: 7.6 },
                { x: "Sep", y: 2.6 },
                { x: "Oct", y: -4.9 },
                { x: "Nov", y: -13.4 },
                { x: "Dec", y: -16.4 }
            ],
            xName: "x",
            width: 2,
            yName: "y",
            name: "Coldest",
        }
    ],
});
chart.appendTo("#container");