const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html.html");
});


app.post("/", function(req, res) {
  const country = req.body.cityName;
  const apiId = "afae66b1b0a0b7fc18515d8af553cb11";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + country + ";&appid=" + apiId;

  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherFromSite = JSON.parse(data);
      const temperature = weatherFromSite.main.temp;
      const weatherDescription = weatherFromSite.weather[0].description;
      const icon = weatherFromSite.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.type("html");

      res.write("the temperature is " + temperature);
      res.write("the description is " + weatherDescription);
      res.write("<img src=" + imageUrl + ">");

      res.send();
    })
  })
})
app.listen(3000)
