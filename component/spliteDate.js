exports.reDate = function (data) {
  let ran = data.length;
  let reData = data;
  for (let i = 0; i < ran; i++) {
    reData[i].date = `${data[i].date.substring(0, 4)}.${data[i].date.substring(
      5,
      6
    )}`;
  }
  return reData;
};
