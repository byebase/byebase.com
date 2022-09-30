const enums = {
}

export const enumsList = enums;

/**
 * 获取枚举列表
 * @param {String} key 枚举集合的key
 * @param {Boolean} withAll 是否带全部，默认不带
 * @param {String} allTxt 如果带全部的话，全部的文本
 * @param {String} allValue 如果带全部的，全部对应的值
 */
export const getEnums = (key, withAll = false, allTxt = "全部", allValue = "") => {
  const all = {name: allTxt, value: allValue};
  if (!key) return withAll ? [all] : [];
  let enumArr = enums[key];
  if (!enumArr) return withAll ? [all] : [];
  return withAll ? [all, ...enumArr] : [...enumArr]
}

/**
 * 通过枚举值反向获取对应的枚举信息，包括中文、颜色等信息
 * @param {String} key 枚举集合的key
 * @param {String} value 枚举值
 */
export const getEnumItem = (key, value) => {
  if (!key) return {};
  let enumArr = enums[key];
  if (!enumArr) return {};
  const enumItem = enumArr.find(e => e.value == value) || {};
  return enumItem;
}