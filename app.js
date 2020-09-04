const express = require("express");
const https = require("https");
const { response } = require("express");
const bodyParser = require("body-parser");

const app =express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
   
    
const query=req.body.cityName;
const apiKey="YOUR KEY HERE";

const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;
 https.get(url,function(response){

     console.log(response.statusCode);

     response.on("data",function(data){

         const weatherData=JSON.parse(data);
         const temp1=weatherData.main.temp;
         const country=weatherData.sys.country;
         const desc=weatherData.weather[0].description;
         const city=weatherData.name;
         const icon=weatherData.weather[0].icon;

         const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.write("<p>The weather is"+desc+"</p>")
        res.write("<h1>The temperature in "+city+","+country+" is "+temp1+"&#8451;</h1>");
        res.write("<img src="+imageUrl+"  >")
        res.send();
     })

 })





    
})







app.listen(3000,function(){
    console.log("Server running on 3000");
})
