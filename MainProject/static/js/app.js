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
        tgt = []
        urg = []
        non_urg = []

        //Create loop to append to each array for charting
        importedData.forEach(function(obj) {
            var label = obj.facility_name
            labels.push(label)

            // var ids = obj.oshpd_id
            // id.push(ids)

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

            var non = obj.NonLatino
            NonHispanics.push(non)

            // var lat = obj.LATITUDE
            // Latitude.push(lat)

            // var long = obj.LONGITUDE 
            // longitude.push(long)

            var target = obj.Target
            tgt.push(target)

            var urgent = obj.UrgnetVisits
            urg.push(urgent)

            var nonUrgent = obj.NonUrgnetVisits
            non_urg.push(nonUrgent)


        });
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
            profile_dict["UrgnetVisits"] = obj.UrgnetVisits
            profile_dict["NonUrgnetVisits"] = obj.NonUrgnetVisits
                

            //Push to array
            demoData.push(profile_dict)
                
        })
        

        //#############################################################
        // define variable to filter data
        //#############################################################

        // Filter by district name
        var info = demoData.filter(d => d.facility_name == id)
        console.log(info)

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
        var level = info[0].Target * 100

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
                text: ['0.90', '0.80', '0.70', '0.60', '0.50', '0.40'],
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


        var data2 = [{
            labels: ["Urgent", "Non-Urgent"],
            values: [info[0]["UrgnetVisits"], info[0]["NonUrgnetVisits"]],
            type: 'pie'


        }];
            

        // Define the plot layout
        var layout2 = {
            height: 500,
            width: 500
        };

        // Plot the chart to a div tag with id "pie"
        Plotly.newPlot('pie', data2, layout2);

    });
    
};

//#############################################################
// create  function for change event
//#############################################################

function optionChanged(id) {
   
    getData(id);
}
// optionChanged()
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
       
        getData(names[0]);

    })
}

init();