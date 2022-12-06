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
let newsList = [
  "네이버 뉴스",
  "뉴스핌",
  "시민일보",
  "컨슈머타임스",
  "데일리경제",
  "NBNTV",
  "국제신문",
  "국제뉴스",
  "부산제일경제",
  "SR타임스 모바일 사이트",
  "신아일보",
  "디지틀조선TV",
  "한국정경신문",
  "CNB뉴스",
  "아시아투데이",
  "브레이크뉴스",
  "데일리한국",
  "일요신문",
  "이뉴스투데이",
  "비지니스코리아",
];
let newsListNumber = [
  "n.news.naver",
  "newspim",
  "siminilbo",
  "cstimes",
  "kdpress",
  "nbntv",
  "kookje",
  "gukjenews",
  "busaneconomy",
  "srtimes",
  "shinailbo",
  "dizzotv",
  "kpenews",
  "cnbnews",
  "asiatoday",
  "breaknews",
  "daily.hankooki",
  "ilyo",
  "enewstoday",
  "businesskorea",
];
let client_id = process.env.NAVER_id;
let client_secret = process.env.NAVER_secret;

let article = {};
let prinum = 0;

function splite() {}

function findPress(data) {
  let ran = newsList.length;
  for (let i = 0; i < ran; i++) {
    if (data.includes(newsListNumber[i])) {
      return newsList[i];
    }
  }
  return "NaN";
}
function makeDate(year, month, day) {
  let mon;
  switch (month) {
    case "Jan":
      mon = "1";
      break;
    case "Feb":
      mon = "2";
      break;
    case "Mar":
      mon = "3";
      break;
    case "Apr":
      mon = "4";
      break;
    case "May":
      mon = "5";
      break;
    case "Jun":
      mon = "6";
      break;
    case "Jul":
      mon = "7";
      break;
    case "Aug":
      mon = "8";
      break;
    case "Sep":
      mon = "9";
      break;
    case "Oct":
      mon = "10";
      break;
    case "Nov":
      mon = "11";
      break;
    case "Dec":
      mon = "12";
      break;
  }
  return year + "-" + mon + "-" + day; 
}

function reDate(data){
  let ran = data.length;
  for(let i =0;i<ran;i++){
    data[i].date = `${data[i].date.substring(0,4)}.${data[i].date.substring(5,6)}`;
  }
  return data;
}

app.get("/api/getjson", function (req, res) {
  let sql = `select * from news order by date`;
  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(reDate(results));
  });
});

app.get("/api/news", function (req, res) {
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

          // body[i].pubDate.substring(8, 11) month
          // body[i].pubDate.substring(12, 16) year
          // body[i].pubDate.substring(5,7) day
          let year = body[i].pubDate.substring(12, 16);
          let month = body[i].pubDate.substring(8, 11);
          let day = body[i].pubDate.substring(5,7);
          let press = findPress(body[i].link);
          sql = `INSERT INTO news(title, link, date, press) values('${
            body[i].title
          }', '${body[i].link}', '${makeDate(year, month, day)}', '${press}')`;
          connection.query(sql, function (err, results, fields) {
            if (err) {
              console.log(err);
            }
            //console.log(results);
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

let port = 3001
app.listen(port, function () {
  console.log(`http://127.0.0.1:${port}/ app listening on port ${port}!`);
});
