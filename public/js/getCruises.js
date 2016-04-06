$(document).ready(function(){
    $('#csvb').click(function(){
	$.ajax({url: "/getPortages", success: function(result){
            if(result == '')
                return;
            JSONToCSVConvertor(result, "Cruises", true);
        }});
    });
    $('#jsonb').click(function(){
       getJSON(); 
    });

});

function getJSON(){
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = '/getPortages';
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = "tours.JSON";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function JSONToCSVConvertor(JSONData, ReportTitle) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    CSV += ReportTitle + '\r\n\n';

    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    var fileName = "AlaskaTouring";
    fileName += ReportTitle.replace(/ /g,"_");   
    
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    var link = document.createElement("a");    
    link.href = uri;
    
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
