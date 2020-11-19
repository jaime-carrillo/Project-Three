// Store API query variables
var baseURL = "https://emsmain.herokuapp.com";
var option = "/api/v1.0/ed";

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
        zip = []
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

        //Create loop to append to each array for charting
        importedData.forEach(function(obj) {
            var label = obj.facility_name
            labels.push(label)

            var ids = obj.oshpd_id
            id.push(ids)

            var zips = obj.DBA_ZIP_CODE
            zip.push(zips)

            var visit = obj.ED_Visit
            visits.push(visit)

            var type = obj.control_type_desc
            hospType.push(type)

            var size = obj.licensed_bed_size
            hospSize.push(size)

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

            var non = obj.HispanicorNon
            NonHispanics.push(non)

        });

        //#############################################################
        // Create bar chart
        //#############################################################

        // Create trace for ED visits (1)

        // Create trace for hospital size (2)
        var trace1 = {
            x: hospType,
            y: labels,
            name: 'Hospital Type',
            type: 'bar',
            // text: hospType.map(String),
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
        console.log(labels);

        var trace2 = {
            x: hospSize,
            y: labels,
            name: 'Hospital Size',
            type: 'bar',
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
        console.log(hospSize);

        var trace3 = {
            x: labels,
            y: visits,
            name: 'Visits',
            type: 'bar',
            // text: visits.map(String),
            textposition: 'auto',
            hoverinfo: 'True',
            // hovertemplate: "%{y}",
            marker: {
                color: 'rgb(8,68,202)',
                opacity: 0.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };

        var trace4 = {
            x: labels,
            y: medical,
            name: 'Medi-Cal',
            type: 'bar',
            // text: medical.map(String),
            textposition: 'auto',
            hoverinfo: 'True',
            marker: {
                color: 'rgb(239,22,17)',
                opacity: 0.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };

        var trace5 = {
            x: labels,
            y: Hispanics,
            name: 'Hispanics',
            type: 'bar',
            // text: Hispanics.map(String),
            textposition: 'auto',
            hoverinfo: 'True',
            marker: {
                color: 'rgb(43,232,241)',
                opacity: 1.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };
        // Create the data array for our plot
        var data1 = [trace1];
        var data2 = [trace2];
        var data3 = [trace3, trace4, trace5];

        // Define the plot layout
        var layout = {
            title: "All Hospitals",
            xaxis: {
                tickmode: "none",
                showticklabels: "false",
                zeroline: "false"
            },
            yaxis: {
                tickmode: "none",
                showticklabels: "false",
            },
            height: 275,
            width: 375
        };

        var layout2 = {
            title: "All Hospitals",
            yaxis: {
                // nticks: 0,
            },
            height: 500,
            width: 1100
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar1", data1, layout);
        Plotly.newPlot("bar2", data2, layout);
        Plotly.newPlot("bar3", data3, layout2);



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
            profile_dict["control_type_desc"] = obj.control_type_desc
            profile_dict["Medi_Cal"] = obj.Medi_Cal
            profile_dict["DBA_ZIP_CODE"] = obj.DBA_ZIP_CODE
            profile_dict["licensed_bed_size"] = obj.licensed_bed_size
            profile_dict["SelfPay"] = obj.SelfPay


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
        demoInfo.append("h5").text(info[0].facility_name)
            // .append("h4").text("Name: " + info[0].facility_name)
            .append("h5").text("Total ED Visits: " + info[0].ED_Visit + "\n")
            .append("h6").text("Type of Hospital: " + info[0].control_type_desc + "\n")
            .append("h6").text("Licensed Beds: " + info[0].licensed_bed_size + "\n")
            .append("h6").text("Hispanics: " + info[0].HispanicorLatino + "\n")
            .append("h6").text("Medi-Cal: " + info[0].Medi_Cal)
            .append("h6").text("Self_Pay: " + info[0].SelfPay)
            .append("h6").text("Zip Code: " + info[0].DBA_ZIP_CODE)
            // .append("h6").text("Food Insecurity: " + info[0].Food_insecurity)
            // .append("h6").text("Health Index: " + info[0].Health_index)


        //#############################################################
        // Gauge for dynamic district
        //#############################################################

        // Enter a speed between 0 and 180
        // var level = info[0].Health_index * 1.71

        // Trig to calc meter point
        // var degrees = 180 - level,
        //     radius = .5;
        // var radians = degrees * Math.PI / 180;
        // var x = radius * Math.cos(radians);
        // var y = radius * Math.sin(radians);
        // var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // // Path: may have to change to create a better triangle
        // var mainPath = path1,
        //     pathX = String(x),
        //     space = ' ',
        //     pathY = String(y),
        //     pathEnd = ' Z';
        // var path = mainPath.concat(pathX, space, pathY, pathEnd);

        // //Create data for dynamic guage
        // var data2 = [{
        //         type: 'scatter',
        //         x: [0],
        //         y: [0],
        //         marker: { size: 14, color: '850000' },
        //         showlegend: false,
        //         name: 'Index',
        //         text: info[0].Health_index,
        //         hoverinfo: 'text+name'
        //     },
        //     {
        //         values: [1, 1, 1, 1, 1, 1, 6],
        //         rotation: 90,
        //         text: ['100', '80', '60', '40', '20', '0', ''],
        //         textinfo: 'text',
        //         textposition: 'inside',
        //         marker: {
        //             colors: ['#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
        //                 'rgba(0, 0, 0, 0)'
        //             ]
        //         },
        //         hoverinfo: 'label',
        //         hole: .5,
        //         type: 'pie',
        //         showlegend: false
        //     }
        // ];

        // //Create layout for dynamic guage
        // var layout2 = {
        //     shapes: [{
        //         type: 'path',
        //         path: path,
        //         fillcolor: 'rgba(0, 0, 0, 0)',
        //         line: {
        //             color: '850000'
        //         }
        //     }],
        //     title: info[0].GEONAME,
        //     subtitle: 'Plot Subtitle',
        //     height: 370,
        //     width: 370,
        //     xaxis: {
        //         zeroline: false,
        //         showticklabels: false,
        //         showgrid: false,
        //         range: [-1, 1],
        //         titlefont: {
        //             title: 'x Axis',
        //             family: 'Courier New, monospace',
        //             size: 18,
        //             color: '#7f7f7f'
        //         }
        //     },
        //     yaxis: {
        //         zeroline: false,
        //         showticklabels: false,
        //         showgrid: false,
        //         range: [-1, 1]
        //     }
        // };

        //Plot dynamic gauge chart
        // Plotly.newPlot('gauge1', data2, layout2);

        //#############################################################
        // Cards for Hospital Types and Size
        //#############################################################
        // var benchmark = 44.73372093
        // var level = benchmark * 1.71

        // // Trig to calc meter point
        // var degrees = 180 - level,
        //     radius = .5;
        // var radians = degrees * Math.PI / 180;
        // var x = radius * Math.cos(radians);
        // var y = radius * Math.sin(radians);
        // var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // // Path: may have to change to create a better triangle
        // var mainPath = path1,
        //     pathX = String(x),
        //     space = ' ',
        //     pathY = String(y),
        //     pathEnd = ' Z';
        // var path = mainPath.concat(pathX, space, pathY, pathEnd);

        // //Create data for static guage
        // var data2 = [{
        //         type: 'scatter',
        //         x: [0],
        //         y: [0],
        //         marker: { size: 14, color: '850000' },
        //         showlegend: false,
        //         name: 'Index',
        //         text: benchmark,
        //         hoverinfo: 'text+name'
        //     },
        //     {
        //         values: [1, 1, 1, 1, 1, 1, 6],
        //         rotation: 90,
        //         text: ['100', '80', '60', '40', '20', '0', ''],
        //         textinfo: 'text',
        //         textposition: 'inside',
        //         marker: {
        //             colors: ['#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
        //                 'rgba(0, 0, 0, 0)'
        //             ]
        //         },
        //         hoverinfo: 'label',
        //         hole: .5,
        //         type: 'pie',
        //         showlegend: false
        //     }
        // ];

        //Create layout for static guage
        //     var layout2 = {
        //         shapes: [{
        //             type: 'path',
        //             path: path,
        //             fillcolor: 'rgba(0, 0, 0, 0)',
        //             line: {
        //                 color: '850000'
        //             }
        //         }],
        //         title: 'Los Angles County',
        //         subtitle: 'Plot Subtitle',
        //         height: 400,
        //         width: 400,
        //         xaxis: {
        //             zeroline: false,
        //             showticklabels: false,
        //             showgrid: false,
        //             range: [-1, 1],
        //             titlefont: {
        //                 title: 'x Axis',
        //                 family: 'Courier New, monospace',
        //                 size: 18,
        //                 color: '#7f7f7f'
        //             }
        //         },
        //         yaxis: {
        //             zeroline: false,
        //             showticklabels: false,
        //             showgrid: false,
        //             range: [-1, 1]
        //         }
        //     };

        //Plot static gauge chart
        Plotly.newPlot('gauge2', data2, layout2);
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