function generateRandomAlphanum(length) {
  const alphaNum =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let generate = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * alphaNum.length);
    generate += alphaNum[index];
  }
  return generate;
}

function daysDifference(date1, date2){
  let difference = Math.floor(Number(date1) - Number(date2) / (1000 * 60 * 60 * 24));
  return difference;
};

async function getMaxId(tableName, colName, prefix, padLen) {
  const conn = require("../databases/connection");
  const { QueryTypes } = require("sequelize");

  let keyword = "%" + prefix + "%";
  let queryNow = `Select ${colName} from ${tableName} where ${colName} LIKE \'${keyword}\'`;
  let jum = await conn.query(queryNow, { type: QueryTypes.SELECT });
  max_id = jum.reduce((accum, item) => {
    now_id = parseInt(
      String(item[colName]).substring(prefix.length, prefix.length + padLen)
    );
    if (now_id > accum) {
      return now_id;
    } else {
      return accum;
    }
  }, 0);
  max_id = max_id + 1;
  id_now = prefix + String(max_id).padStart(padLen, "0");
  return id_now;
}

module.exports = {
  generateRandomAlphanum,
  daysDifference,
  getMaxId,
};
