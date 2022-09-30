import {
  timestampToDateTime,
  timestampToDate
} from "@/assets/base/util"
import * as enums from "../enums"

export default function (Vue) {
  // 时间戳格式化为时间
  Vue.filter('toDate', function (value) {
    return timestampToDate(value)
  })
  // 时间戳格式化为时间日期
  Vue.filter('toDateTime', function (value) {
    return timestampToDateTime(value)
  })
  // 获取枚举对应中文
  Vue.filter('getEnum', function (value, enumArryKey, defaultLabel = "") {
    const en = enums.getEnumItem(enumArryKey, value)
    return (en && en.name) ? en.name : defaultLabel
  })
}