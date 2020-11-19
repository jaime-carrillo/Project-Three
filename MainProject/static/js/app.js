// Store API query variables
// var baseURL = "https://emsmain.herokuapp.com";
var baseURL = "http://127.0.0.1:5000"
var option = "/api/v1.0/encounters";

// Assemble API query URL
var url = baseURL + option
console.log(url)


//#############################################################
//Create function to get the values from the API
//#############################################################

function getValues(id) {

    // Fetch the JSON data and console log it
    d3.json(url).then(importedData => {
        // console.log(importedData)

        //Create arrays for charting
        labels = []
        id = []
        visits = []
        hospType = []
        hospSize = []
        medical = []
        medicare = []
        other = []
        self = []
        dx = []
        Hispanics = []
        NonHispanics = []
        lat = []
        long = []
        target = []

        //Create loop to append to each array for charting
        importedData.forEach(function(obj) {
            var label = obj.facility_name
            labels.push(label)

            var ids = obj.oshpd_id
            id.push(ids)

            var visit = obj.ED_Visit
            visits.push(visit)

            var size = obj.Beds
            hospSize.push(size)

            var type = obj.Type
            hospType.push(type)

            var cal = obj.Medi_Cal
            medical.push(cal)

            var care = obj.Medicare
            medicare.push(care)

            var ot = obj.Other_Payer
            other.push(ot)

            var pay = obj.SelfPay
            self.push(pay)

            var d = obj.DX_Symptoms
            dx.push(d)

            var his = obj.HispanicorLatino
            Hispanics.push(his)

            var non = obj.Non-HispanicorNon-Latino
            NonHispanics.push(non)

            var lat = obj.LATITUDE
            Latitude.push(lat)

            var long = obj.LONGITUDE 
            longitude.push(long)

            var target = obj.Target
            tgt.push(target)

        });

        //#############################################################
        // Create bar chart
        //#############################################################

       
        // Create trace for Hispanic vs Non-Hispanic
        var trace1 = {
            x: labels,
            y: Hispanics,
            name: 'Hispanics',
            type: 'pie',
            // text: values.map(String),
            // textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'orange',
                opacity: 0.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };
        // console.log(labels);

        var trace2 = {
            x: labels,
            y: NonHispanics,
            name: 'Non Hispanic',
            type: 'pie',
            text: hospSize.map(
                hospSize => `${hospSize}`
            ),
            // textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'rgb(15,185,161)',
                opacity: 0.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };
        // console.log(hospSize);
        
        // var trace3 = {
        //     x: labels,
        //     y: visits,
        //     name: 'Visits',
        //     type: 'bar',
        //     // text: visits.map(String),
        //     textposition: 'auto',
        //     hoverinfo: 'True',
        //     // hovertemplate: "%{y}",
        //     marker: {
        //         color: 'rgb(8,68,202)',
        //         opacity: 0.5,
        //         line: {
        //             color: 'rgb(8,48,107)',
        //             width: 1.5
        //         }
        //     }
        // };

        // var trace1 = {
        //     x: labels,
        //     y: medical,
        //     name: 'Medi-Cal',
        //     type: 'bar',
        //     // text: medical.map(String),
        //     textposition: 'auto',
        //     hoverinfo: 'True',
        //     marker: {
        //         color: 'rgb(239,22,17)',
        //         opacity: 0.5,
        //         line: {
        //             color: 'rgb(8,48,107)',
        //             width: 1.5
        //         }
        //     }
        // };

        // var trace2 = {
        //     x: labels,
        //     y: Hispanics,
        //     name: 'Hispanics',
        //     type: 'bar',
        //     // text: Hispanics.map(String),
        //     textposition: 'auto',
        //     hoverinfo: 'True',
        //     marker: {
        //         color: 'rgb(43,232,241)',
        //         opacity: 1.5,
        //         line: {
        //             color: 'rgb(8,48,107)',
        //             width: 1.5
        //         }
        //     }
        // };
        // // Create the data array for our plot
        // var data1 = [trace1, trace2];
        // var data2 = [trace2];
        // var data3 = [trace3, trace4, trace5];

        // Define the plot layout
        // var layout2 = {
        //     title: "All Hospitals",
        //     xaxis: {
        //         tickmode: "none",
        //         showticklabels: "false",
        //         zeroline: "false"
        //     },
        //     yaxis: {
        //         tickmode: "none",
        //         showticklabels: "false",
        //     },
        //     height: 275,
        //     width: 375
        // };

        // var layout2 = {
        //     title: "All Hospitals",
        //     yaxis: {
        //         // nticks: 0,
        //     },
        //     height: 500,
        //     width: 1100
        // };

        // // Plot the chart to a div tag with id "bar"
        // Plotly.newPlot("bar1", data1, layout);
        // Plotly.newPlot("bar2", data2, layout);
        // Plotly.newPlot("bar3", data3, layout2);

        

    })
}

// #############################################################
// On change to the DOM, call getData()
// #############################################################

function getData(id) {
    d3.json(url).then((data) => {
        // console.log(data)

        //Create array for charting 
        demoData = []
        console.log(demoData)

        //Create loop to append to array for charting
        data.forEach(function(obj) {
            profile_dict = {}
            profile_dict["facility_name"] = obj.facility_name
            profile_dict["ED_Visit"] = obj.ED_Visit
            profile_dict["HispanicorLatino"] = obj.HispanicorLatino
            profile_dict["Type"] = obj.Type
            profile_dict["Medi_Cal"] = obj.Medi_Cal
            profile_dict["Beds"] = obj.Beds
            profile_dict["SelfPay"] = obj.SelfPay
            profile_dict["Target"] = obj.Target
                

            //Push to array
            demoData.push(profile_dict)
                // console.log(profile_dict)
        })
        console.log(id)

        //#############################################################
        // define variable to filter data
        //#############################################################

        // Filter by district name
        var info = demoData.filter(d => d.facility_name == id)
        console.log(info[0].facility_name)

        // select demographic data from list
        var demoInfo = d3.select("#sample-metadata");

        //clear demographic info before update
        demoInfo.html("");

        // get demographic data for the name and append to panel
        demoInfo.append("h4").text(info[0].facility_name)
            // .append("h4").text("Name: " + info[0].facility_name)
            .append("h4").text("Total ED Visits: " + info[0].ED_Visit + "\n")
            .append("h4").text("Target: " + info[0].Target + "\n")
            .append("h5").text("Type of Hospital: " + info[0].Type + "\n")
            .append("h5").text("Licensed Beds: " + info[0].Beds + "\n")
           

        //#############################################################
        // Gauge for dynamic district
        //#############################################################

        // Enter a speed between 0 and 180
        var level = info[0].Target * 10000

        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        // //Create data for dynamic guage
        var data = [{
                type: 'scatter',
                x: [0],
                y: [0],
                marker: { size: 14, color: '850000' },
                showlegend: false,
                name: 'target',
                text: info[0].Target,
                hoverinfo: 'text+name'
            },
            {
                values: [1, 1, 1, 1, 1, 1, 6],
                rotation: 90,
                text: ['1.0', '0.90', '0.80', '0.70', '0.60', '0.50', ''],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: ['#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
                        'rgba(0, 0, 0, 0)'
                    ]
                },
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
            }
        ];

        // //Create layout for dynamic gauge
        var layout = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: 'rgba(0, 0, 0, 0)',
                line: {
                    color: '850000'
                }
            }],
            title: info[0].facility_name,
            subtitle: 'Plot Subtitle',
            height: 500,
            width: 550,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1],
                titlefont: {
                    title: 'x Axis',
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };

        // Plot dynamic gauge chart
        Plotly.newPlot('gauge', data, layout);

    });
}

//#############################################################
// create  function for change event
//#############################################################

function optionChanged(id) {
    getValues(id);
    getData(id);
}
optionChanged()
//#############################################################
// create initial function to get data and display plots
//#############################################################
function init() {
    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");

    // read the data 
    d3.json(url).then((data) => {

        names = []
        data.forEach(function(obj) {
                var label = obj.facility_name
                names.push(label)
            })
            // console.log(names)

        //get ids for dropdow
        names.forEach(function(ID) {
            dropdownMenu.append("option").text(ID).property("value");
        })

        // call functions to display plot
        getValues(names[0]);
        getData(names[0]);

    })
}

init();