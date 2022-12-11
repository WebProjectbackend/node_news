exports.makeDate = function (year, month, day) {
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
};
