var express = require("express");
var morgan = require("morgan");
var path = require('path');
var ejs = require('ejs'); 
var bodyParser = require("body-parser");

var router =  require("./routes/route");


var app = express();

//app.engine('html', ejs.__express); //设置html引擎
app.set('view engine', 'ejs'); //设置视图引擎
app.set('views', path.join(__dirname, './views'));//放置视图引擎的文件夹

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.static("./public"));
app.use(morgan());

/**
 * get请求
 */
app.get("/",router.home);
app.get("/search",router.search);



/**
 * 监听端口
 */
app.listen(8888,function(){
	console.log("run....");
});

module.exports = app;