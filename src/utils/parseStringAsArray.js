module.exports = function parseStringAsArray(arrayAsStr) {
  return arrayAsStr.split(",").map(tech => tech.trim());
};
