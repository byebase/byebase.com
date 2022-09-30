import * as enums  from "./enums";
import filter from "./filter"
import directives from "./directives";
import plugins from "./plugins";
import "./type-ext";

let ext = {};
ext.install = function(Vue, options) {
  Vue.prototype.$enums = enums
  filter(Vue);
  directives(Vue);
  plugins(Vue);
}
export default ext;
