import math from "lodash/math";

// 扩展内置类型的一些方法

/**
 * 加
 * @param {String|Number} value 要加的数字
 * @param {Number} precision 保留几位小数
 */
String.prototype.add = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.add(this - 0, value - 0);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 减
 * @param {String|Number} value 要减的数字
 * @param {Number} precision 保留几位小数
 */
String.prototype.subtract = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.subtract(this, value);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 乘
 * @param {String|Number} value 要乘的数字
 * @param {Number} precision 保留几位小数
 */
String.prototype.multiply = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.multiply(this, value);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 除
 * @param {String|Number} value 要除的数字
 * @param {Number} precision 保留几位小数
 */
String.prototype.divide = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.divide(this, value);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 加
 * @param {String|Number} value 要加的数字
 * @param {Number} precision 保留几位小数
 */
Number.prototype.add = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.add(this - 0, value - 0);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 减
 * @param {String|Number} value 要减的数字
 * @param {Number} precision 保留几位小数
 */
Number.prototype.subtract = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.subtract(this - 0, value - 0);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 乘
 * @param {String|Number} value 要乘的数字
 * @param {Number} precision 保留几位小数
 */
Number.prototype.multiply = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.multiply(this - 0, value - 0);
  if (!precision) return res;
  return math.round(res, precision);
}

/**
 * 除
 * @param {String|Number} value 要除的数字
 * @param {Number} precision 保留几位小数
 */
Number.prototype.divide = function (value, precision=0) {
  if (isNaN(this) || isNaN(value)) return this;
  const res = math.divide(this - 0, value - 0);
  if (!precision) return res;
  return math.round(res, precision);
}