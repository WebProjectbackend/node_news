let makeMonth = require("./makeDate");
exports.reDate = function (data) {
  let ran = data.length;
  let reData = data;
  for (let j = 0; j < ran; j++) {
    data[j].date = data[j].date.toString();
  }
  for (let i = 0; i < ran; i++) {
    let month = makeMonth.makeMon(data[i].date.substring(4, 7));
    reData[i].date = `${data[i].date.substring(11, 15)}.${month}`;
  }
  return reData;
};
