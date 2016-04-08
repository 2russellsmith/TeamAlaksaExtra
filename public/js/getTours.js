$(document).ready(function(){
    $('#csvb').click(function(){
	$.ajax({url: "/gettours", success: function(result){
            if(result == '')
                return;
            JSONToCSVConvertor(result, "Tours", true);
        }});
    });
    $('#jsonb').click(function(){
       getJSON(); 
    });
    $.ajax({url: "/getShips", success: function(result){
         for(var ship in result) {
             var x = document.getElementById("shipSelect");
             var option = document.createElement("option");
             option.text = result[ship].name;
             x.add(option);
          }
     }});
     $('select').on('change', function() {
         var selected = this.value ; // or $(this).val()
        $("#tourTable tr").remove(); 
        $.ajax({url: "/gettours", success: function(result){
         for(var tour in result) {
             var table = document.getElementById("tourTable");
             if(result[tour].boat == selected){
                  var row = table.insertRow(-1); 
                  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                  var tourName = row.insertCell(0);
                  var description = row.insertCell(1);
     	          var startTime = row.insertCell(2);
                  var endTime = row.insertCell(3);
     
     
                  
                  // Add some text to the new cells:
                  tourName.innerHTML = result[tour].name;
                  description.innerHTML = result[tour].description;
     	          startTime.innerHTML = result[tour].start_time.split('T')[1].split('Z')[0];
                  endTime.innerHTML = result[tour].end_time.split('T')[1].split('Z')[0];
                 
               }}
     }});

     });
     $.ajax({url: "/gettours", success: function(result){
         for(var tour in result) {
             var table = document.getElementById("tourTable");
             var row = table.insertRow(-1);

             // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
             var tourName = row.insertCell(0);
             var description = row.insertCell(1);
	     var startTime = row.insertCell(2);
             var endTime = row.insertCell(3);


             
             // Add some text to the new cells:
             tourName.innerHTML = result[tour].name;
             description.innerHTML = result[tour].description;
	     startTime.innerHTML = result[tour].start_time.split('T')[1].split('Z')[0];
             endTime.innerHTML = result[tour].end_time.split('T')[1].split('Z')[0];
          }
     }});


});

function getJSON(){
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = '/gettours';
    
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
