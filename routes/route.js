//var sqlDao = require("../dao/sql");

/* GET home page. */
exports.home = function(req,res){
	console.log("get to index");
	res.render("index",{msg:""});
};

exports.search = function(req,res){
    var cityname = req.query.cityname;
    console.log(cityname);
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'steemit',
        password: 'steemit',
        server: 'sql.steemsql.com', 
        database: 'DBSteem' 
    };

    // connect to your database
    
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        sqlquery = "SELECT id, name, substring(substring(json_metadata,charindex('location',json_metadata)+13,100),0,charindex('',substring(json_metadata,charindex('location',json_metadata)+13,100))) as 'location_string', created FROM [dbo].[accounts] WHERE json_metadata like "+"'%"+cityname+"%'"+" order by created desc";
        request.query(sqlquery, function (err, result) {
            sql.close();
            if (err) {
            	console.log(err);
            } else{
            // send records as a response
       
            	console.log(result.recordset)
				for (var i = 0; i < result.recordset.length; i++){
    				console.log(result.recordset[i].id);
  					console.log(result.recordset[i].name);
  					console.log(result.recordset[i].location_string)
  					result.recordset[i].location_string = cityname
				}
          
            	res.render("steemianlist",{rows:result.recordset});
        	}
            
        });
    });

};
