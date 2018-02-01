url = getFundURL(161720);
chart = require('chart.js');
$(document).ready(function() {
    $("#holder").html(getFundURL(161720));
    //$("#download").attr("href",getFundURL(161720));
    Data = showData();
    max_reg = maxMonthReg(Data);
    min_reg = minMonthReg(Data);
    total = 1.0
    for(var i = 0 ; i < max_reg.length-1 ; i+=2) {
        if(Data[min_reg[i]].date < Data[max_reg[i+1]].date) {
            total *= Data[max_reg[i+1]].value/Data[min_reg[i]].value;
            $('#win').append("<tr><td>"+Data[min_reg[i]].date.toLocaleDateString()+"</td><td>"+Data[max_reg[i+1]].date.toLocaleDateString()+"</td><td>"+Data[max_reg[i+1]].value/Data[min_reg[i]].value+"</td></tr>")
        }
    }
    console.log(total);
    var app3 = new Vue({
        el: '#app2',
        data: {
            message: 'You loaded this page on ' + new Date().toLocaleString()
        }
    })
    showChart(Data.map(function(a){return a.date.toLocaleDateString();}),Data.map(function(a){return a.value;}));
}
);
function showChart(Time,Value){
var ctx = $("#myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Time,
        datasets: [{
            label: '# of Votes',
            data: Value,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
function showData(){
    var Data = [];
    var flag = true;
    var count = 0;
    var mxs = [];
    for( var i = 0 ; i < Data_netWorthTrend.length ; ++i) {
        Data.push({"date":new Date(Data_netWorthTrend[i].x),"value":Data_netWorthTrend[i].y});
        if(i>0) {
            if(Data[i].value < Data[i-1].value){
                count++;
            }else{
                mxs.push(count);
                count = 0;
            }
        }
        $('#table').append("<tr><td>"+Data[i].date.toLocaleDateString()+"</td><td>"+Data[i].value+"</td><td>"+count+"</td></tr>")
    }
    console.log(mxs.reduce(function(a,b){return a>b?a:b;}));
    return Data;
}
function maxMonthReg(Data) {
    var arr = [];
    var cur_month = Data[0].date.getMonth();
    var cur_value = Data[0].value;
    var index = 0;
    for( var i = 0 ; i < Data_netWorthTrend.length ; ++i) {
       while(i < Data_netWorthTrend.length && cur_month == Data[i].date.getMonth()) {
            if(cur_value < Data[i].value) {
                cur_value = Data[i].value;
                index = i;
            }
            ++i;
       } 
       arr.push(index);
       if(i < Data_netWorthTrend.length ){
            index = i;
            cur_value = Data[i].value;
            cur_month = Data[i].date.getMonth();
       }
    }
    for( var i = 0 ; i < arr.length ; ++i) {
        $('#max_regression').append("<tr><td>"+Data[arr[i]].date.toLocaleDateString()+"</td><td>"+Data[arr[i]].value+"</td></tr>");
    }
    return arr;
}
function minMonthReg(Data) {
    var arr = [];
    var cur_month = Data[0].date.getMonth();
    var cur_value = Data[0].value;
    var index = 0;
    for( var i = 0 ; i < Data_netWorthTrend.length ; ++i) {
       while(i < Data_netWorthTrend.length && cur_month == Data[i].date.getMonth()) {
            if(cur_value > Data[i].value) {
                cur_value = Data[i].value;
                index = i;
            }
            ++i;
       } 
       arr.push(index);
       if(i < Data_netWorthTrend.length ){
            index = i;
            cur_value = Data[i].value;
            cur_month = Data[i].date.getMonth();
       }
    }
    for( var i = 0 ; i < arr.length ; ++i) {
        $('#min_regression').append("<tr><td>"+Data[arr[i]].date.toLocaleDateString()+"</td><td>"+Data[arr[i]].value+"</td></tr>");
    }
    return arr;
}

function getFundURL(type){
    var time = new Date()
    var year    =   time.getFullYear();
    var month   =   time.getMonth()+1;
    var date    =   time.getDate();
    var hour    =   time.getHours();
    var minute  =   time.getMinutes();
    var second  =   time.getSeconds();
    return "http://fund.eastmoney.com/pingzhongdata/"+type+".js?v="+year+month+date+hour+minute+second;
}

/*$.get(url,function(data){            
    if(data.code==0){  
        try{   
            var a = document.getElementById("download");  
            a.href=data.url;  
            a.download=data.fileName;  
            a.click();  
        }catch(e){   
        }   
    }else{  
        alert(data.errorMsg);  
    }                                 
});*/