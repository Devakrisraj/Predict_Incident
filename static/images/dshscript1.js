// JavaScript source code

var xmlhttp = new XMLHttpRequest();
var url = "http://127.0.0.1:8000/static/cnt_year.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var Application = data.data.map(function(elem) {
            return elem.Applications;
        });
        var months = data.data.map(function(elem) {
            return elem.Month;
        });
        var count = data.data.map(function(elem) {
            return elem.Incident_Counts;
        });
        console.log(data.data[1].Applications);


   // }
//}
//var curryear = JSON.parse(data);
//console.log(schema[0]);
var getUniqueValues = (array) => (
    [...new Set(array)]
);

var mon = getUniqueValues(months);
console.log(mon);

 var App = getUniqueValues(Application);
console.log(App);

let myChart2 = document.getElementById("myChart2").getContext('2d');

 let chart1 = new Chart(myChart2, {
   type: 'bar',
   data: {
      labels: mon,
      //['JAN-2021', 'FEB-2021', 'MAR-2021', 'APR-2021', 'MAY-2021', 'JUNE-2021'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
         label: App[0],
         data: count,
         backgroundColor: '#22aa99'
      }, {
         label: App[1],
         data: count,
         backgroundColor: '#994499'
      }, {
         label: App[2],
         data: count,
         backgroundColor: '#316395'
      }, {
         label: App[3],
         data: count,
         backgroundColor: '#b82e2e'
      }, {
         label: App[4],
         data: count,
         backgroundColor: '#66aa00'
      //}, {
        // label: 'Repairs and improvements',
        // data: [0, 2],
        // backgroundColor: '#dd4477'
      //}, {
      //   label: 'Maintenance',
      //   data: [6, 1],
       //  backgroundColor: '#0099c6'
      //}, {
       //  label: 'Inspection',
       //  data: [0, 2],
       //  backgroundColor: '#990099'
      //}, {
      //   label: 'Loan interest',
      //   data: [0, 3],
      //   backgroundColor: '#109618'
      
      }]
   },
   options: {
        title: {
            text: "Last Six Month Incident raised for different Applications",
            display: true
        },
      responsive: false,
      legend: {
         position: 'right' // place legend on the right side of chart
      },
      scales: {
         xAxes: [{
            stacked: true // this should be set to make the bars stacked
         }],
         yAxes: [{
            stacked: true // this also..
         }]
      }
   }
});

let labels1 = ['Normal','High', 'Low'];
let data1 = [40, 29, 31];
let colors1 = ['#49A9EA', '#36CAAB', '#ffc107'];

let myDoughnutChart = document.getElementById("myChart").getContext('2d');

let chart9 = new Chart(myDoughnutChart, {
    type: 'doughnut',
    data: {
        labels: ['Normal', 'High', 'low'],
        datasets: [ {
            data: [40, 29, 31],
            backgroundColor: ['#49A9EA', '#36CAAB', '#ffc107']
        }]
    },
    options: {
        title: {
            text: "Inquiry Priority",
            display: true
        }
    }
});

let labels4 = ['Assigned', 'New', 'Inprogress', 'Pending', 'Resolved', 'Closed'];
let data4 = [83, 67, 66, 61, 47, 187];
let colors4 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#CFD4D8'];

let myChart4 = document.getElementById("myChart4").getContext('2d');

let chart4 = new Chart(myChart4, {
    type: 'pie',
    data: {
        labels: labels4,
        datasets: [ {
            data: data4,
            backgroundColor: colors4
        }]
    },
    options: {
        title: {
            text: "Status of Incidents",
            display: true
        }
    }
});


}
}


