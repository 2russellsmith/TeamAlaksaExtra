var express = require('express');
var router = express.Router();

var isLoggedin = function (req, res, next) {
if (req.isAuthenticated())
    return next();
res.sendfile('views/login.html');
}

module.exports = function(passport){
router.get('/cruiselist', function(req, res){
    res.sendfile('views/cruise_list.html');
});

router.get('/tourlist', function(req, res){
    res.sendfile('views/tour_list.html');
});

router.get('/tourinput', function(req, res){
    res.sendfile('views/tour_input.html');
});
router.get('/cruiseinput', function(req, res){
    res.sendfile('views/cruise_input.html');
});
router.get('/login', function(req, res){
    res.sendfile('views/login.html');
});

router.get('/getShips', function(req, res){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'cs360'
    });
    
    connection.connect();
    
    connection.query('SELECT * FROM CruiseShip', function(err, rows, fields) {
      if (err) throw err;
    
      console.log('The solution is: ', rows);
      res.send(rows);
    });
    
    connection.end();
});


router.get('/getPortages', function(req, res){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'cs360'
    });
    
    connection.connect();
    
    connection.query('SELECT * FROM Portage', function(err, rows, fields) {
      if (err) throw err;
    
      console.log('The solution is: ', rows);
      res.send(rows);
    });
    
    connection.end();
});

router.get('/getTours', function(req, res){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'cs360'
    });
    
    connection.connect();
    
    connection.query('Select CruiseShip.name as boat, Tours.name, Tours.description, Tours.start_time, Tours.end_time from Tours Join Portage on Tours.portage_id = Portage.id JOIN CruiseShip ON Portage.cruise_ship_id = CruiseShip.id', function(err, rows, fields) {
      if (err) throw err;
    
      console.log('The solution is: ', rows);
      res.send(rows);
    });

    
    connection.end();
});

/* GET login page. */
router.post('/postPortage', function(req, res){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'cs360'
    });
    
    connection.connect();
    
    connection.query('INSERT INTO Portage(cruise_ship_id, dock_time, departure_time, dock_number)  VALUES(' 
                    + req.body['cruise_ship_id'] + ', ' + req.body['dock_time'] + ', ' + req.body['departure_time'] + ', ' + req.body['dock_number'] + ');', function(err, rows, fields) {
      if (err) throw err;
      res.send(rows[0]);
    });

    
    connection.end();
});

router.post('/postTours', function(req, res){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'cs360'
    });
    
    connection.connect();
    
    connection.query('INSERT INTO Tours(company_id, start_time,end_time, capacity, portage_id)  VALUES(' 
                    + req.body['company_id'] + ', ' + req.body['start_time'] + ', ' + req.body['end_time'] + ', ' + req.body['capacity'] + ', ' + req.body['portage_id'] + ');', function(err, rows, fields) {
      if (err) throw err;
    
      res.send(rows[0]);
    });

    
    connection.end();
});
return router;
}
