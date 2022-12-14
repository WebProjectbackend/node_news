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
  "더파워",
  "아주경제",
  "잡포스트",
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
  "thepowernews",
  "ajunews",
  "job-post",
];

exports.findPress = function (data) {
  let ran = newsList.length;
  for (let i = 0; i < ran; i++) {
    if (data.includes(newsListNumber[i])) {
      return newsList[i];
    }
  }
  return "NaN";
};
