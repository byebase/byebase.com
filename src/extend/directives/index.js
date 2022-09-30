export default function(Vue) {

  Vue.directive("percision", {
    update: function(el, binding, vnode, oldVnode) {
      // max：最大值，min：最小值，preLength：整数最大长度，suffLength：小数最大长度
      const {  max, min, preLength = 7, suffLength = 2 } = binding.value || {};
      let val = vnode.data.model.value;
      if (isNaN(val)) {
        vnode.data.model.callback(oldVnode.data.model.value);
        return;
      }
      if (max != undefined && val > max) {
        vnode.data.model.callback(max);
        return;
      }
      if (min != undefined && val < min) {
        vnode.data.model.callback(min);
        return;
      }
      val = val + '';
      // 有长度限制时判断各个部分的长度
      const dotIndex = val.indexOf('.');
      let [lengthBefore, lengthAfter] = [0, 0];
      if (dotIndex == -1) {
        // 没有小数点 说明没小数部分
        lengthBefore = val.length;
        if (val.indexOf('0') == 0 && val.length > 1) {
          vnode.data.model.callback(val.slice(1));
          return;
        }
      } else {
        if (suffLength == 0) {
          vnode.data.model.callback(oldVnode.data.model.value);
          return;
        }
        lengthBefore = dotIndex;
        lengthAfter = val.length - dotIndex - 1;
      }
      if (lengthBefore > preLength || lengthAfter > suffLength||(dotIndex > -1 && suffLength == 0)) {
        vnode.data.model.callback(oldVnode.data.model.value);
      }
    }
  });
}