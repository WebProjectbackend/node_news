document.write("<script src='Press.js'></script>");
document.write("<script src='Date.js'></script>");

require("dotenv").config();
let express = require("express");
let app = express();
const mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = {
  host: process.env.DB_host,
  port: process.env.DB_port,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_database,
};
let connection = mysql.createConnection(conn);
connection.connect();
let sql = "";

let client_id = process.env.NAVER_id;
let client_secret = process.env.NAVER_secret;


app.post("/api/getjson", function (req, res) {
  let sql = `select * from news order by date`;
  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(results);
  });
});

app.get("/search", function (req, res) {
  let api_url =
    "https://openapi.naver.com/v1/search/news.json?query=" +
    encodeURI("초코뮤직") +
    "&display=100&start=1&sort=sim"; // JSON 결과
  let request = require("request");
  let options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      body = JSON.parse(body);
      body = body.items;
      for (let i = 0; i < body.length; i++) {
        if (
          body[i].title.includes("초코뮤직") ||
          body[i].description.includes("초코뮤직")
        ) {
          body[i].title = body[i].title.replace("<b>", "");
          body[i].title = body[i].title.replace("</b>", "");
          body[i].description = body[i].description.replace("<b>", "");
          body[i].description = body[i].description.replace("</b>", "");
          let press = findPress(body[i].link);
          sql = `INSERT INTO news(title, link, date, press) values('${
            body[i].title
          }', '${body[i].link}', '${makeDate(
            body[i].pubDate.substring(8, 11),
            body[i].pubDate.substring(12, 16),
            "y"
          )}', '${press}')`;
          connection.query(sql, function (err, results, fields) {
            if (err) {
              console.log(err);
            }
            console.log(results);
          });
        }
      }
      console.log("good");
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(3001, function () {
  console.log("http://127.0.0.1:3001/ app listening on port 3001!");
});
