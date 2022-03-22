// JavaScript source code

var xmlhttp = new XMLHttpRequest();


var url = "http://127.0.0.1:8000/static/cnt_list.json";  // Incident count file
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var counti = data.data.map(function(elem) {
            return elem.Count;
        });
       console.log(data.data[1].Count);

    var coun = data.data[0].Count;

    document.getElementById('incount').innerHTML = data.data[0].Count;
    document.getElementById('pcount').innerHTML = data.data[1].Count;
    document.getElementById('ccount').innerHTML = data.data[2].Count;




var url = "http://127.0.0.1:8000/static/pred_cnt.json";  //Prediction count file
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var months = data.data.map(function(elem) {
            return elem.Month;
        });
        var count = 0;
        count = data.data.map(function(elem) {
            return elem.Incident_Counts;
        });

var url = "http://127.0.0.1:8000/static/Predarea.json";  //Prediction Application File
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var pred = data.data.map(function(elem) {
            return elem.Acrnonym;
        });

        
        

        console.log(data);

let labelsp = months;
let datap = count;
let colorsp = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#AC5353','#34498E', '#316395'];

var ctx = document.getElementById('myChart4').getContext('2d');
var myChart4 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelsp,
        datasets: [{
            data: datap,
            backgroundColor: colorsp,
            borderWidth: 1
        }]
    },
        
    options: {
        title: {
            display: true,
            text: pred
                 },
            legend: { display: false },
            scales: {
                 yAxes: [{
                 ticks: {
                    beginAtZero: true
                        }
                        }]
                    }          
     
             }
});
console.log(data);      
var url = "http://127.0.0.1:8000/static/cnt_year.json";      //Current year Incident File
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




        
var url = "http://127.0.0.1:8000/static/sts_cnt_year.json";     //Current Year Status File
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var Inci_count = data.data.map(function(elem) {
            return elem.Incident_Counts;
        });
        var status = data.data.map(function(elem) {
            return elem.Status;
        });

        console.log(data);





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

let myChart = document.getElementById("myChart").getContext('2d');

 let chart = new Chart(myChart, {
   type: 'bar',
   data: {
      labels: mon,
      //['JAN-2021', 'FEB-2021', 'MAR-2021', 'APR-2021', 'MAY-2021', 'JUNE-2021'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
         label: App[0],
         data: [count[0],count[1],count[2],count[3],count[4],count[5]],
         backgroundColor: '#22aa99'
      }, {
         label: App[1],
         data: [count[6],count[7],count[8],count[9],count[10],count[11]],
         backgroundColor: '#994499'
      }, {
         label: App[2],
         data: [count[12],count[13],count[14],count[15],count[16],count[17]],
         backgroundColor: '#316395'
      }, {
         label: App[3],
         data: [count[18],count[19],count[20],count[21],count[22],count[23]],
         backgroundColor: '#b82e2e'
      }, {
         label: App[4],
         data: [count[24],count[25],count[26],count[27],count[28],count[29]],
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



var url = "http://127.0.0.1:8000/static/prty_cnt_year.json";    //Priority Count File
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var Inci_count = data.data.map(function(elem) {
            return elem.Incident_Counts;
        });
        var status = data.data.map(function(elem) {
            return elem.Priority;
        });

        console.log(data);


    
var countm = 0;
var counth = 0;
var countl = 0;

console.log(data.data[1].Incident_Counts);

//if (data.data[1].Status == "Assigned"){
//        counta = counta + data.data[1].Incident_Counts ;
//        }

for(let i = 0; i < data.data.length; i++){
   if (data.data[i].Priority == "3-Medium"){
      countm = countm + data.data[i].Incident_Counts ;
      }
   if (data.data[i].Priority == "4-Low"){
       countl = countl + data.data[i].Incident_Counts ;
    }
   if (data.data[i].Priority == "2-High"){
       counth = counth + data.data[i].Incident_Counts ;
    }
}

console.log(counth);

let labels1 = ['Medium','High', 'Low'];
let data1 = [countm, counth , countl];
let colors1 = ['#49A9EA', '#36CAAB', '#ffc107'];

let myDoughnutChart = document.getElementById("myChart3").getContext('2d');

let chart1 = new Chart(myDoughnutChart, {
    type: 'doughnut',
    data: {
        labels: labels1,
        datasets: [ {
            data: data1,
            backgroundColor: colors1,
        }]
    },
    options: {
        title: {
            text: "Inquiry Priority",
            display: true
        }
    }
});
}
}

var counta = 0;
var counti = 0;
var countp = 0;
var countc = 0;

console.log(data.data[1].Incident_Counts);
console.log(data.data[1].Status);

//if (data.data[1].Status == "Assigned"){
//        counta = counta + data.data[1].Incident_Counts ;
//        }

for(let i = 0; i < data.data.length; i++){
   if (data.data[i].Status == "Assigned"){
      counta = counta + data.data[i].Incident_Counts ;
      }
   if (data.data[i].Status == "In Progress"){
       counti = counti + data.data[i].Incident_Counts ;
    }
   if (data.data[i].Status == "Pending"){
       countp = countp + data.data[i].Incident_Counts ;
    }
   if (data.data[i].Status == "Closed"){
       countc = countc + data.data[i].Incident_Counts ;
    }
}
console.log(counta);


let labels4 = ['Assigned', 'Inprogress', 'Pending', 'Closed'];
let data4 = [counta, counti, countp, countc];
let colors4 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#CFD4D8'];

let myChart2 = document.getElementById("myChart2").getContext('2d');

let chart4 = new Chart(myChart2, {
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
}
}
}
}
}
}
}
}








var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}





