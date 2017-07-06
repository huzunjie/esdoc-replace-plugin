const fs = require('fs');
let options;
exports.onStart = function(ev) {
  /* option为数组：
  * [
  *   {
  *     filepath: 'xxx/xxx.xx',
  *     rules:[{
  *       substr: '目标字串',
  *       replacement: '目标字串替换为本字串'
  *     }]
  *   }
  * ]
  */
  options = ev.data.option;
};
exports.onComplete = function(ev) {
  if(!options || !options.length){
    throw new Error('esdoc-replace-plugin options is undefined!');
    return;
  }
  options.forEach(item => replace(item.filepath, item.rules));
};

// 按设定规则替换文件内容
function replace(filepath, rules){
  if(!filepath){
    throw new Error('esdoc-replace-plugin filepath is undefined!');
    return;
  }
  if(!rules || !rules.length){
    throw new Error('esdoc-replace-plugin rules is undefined!');
    return;
  }

  let fileText = fs.readFileSync(filepath, "utf-8");
  if(fileText!==null){
    rules.forEach(rule => {
      let {substr, replacement, regexp} = rule;
      if(regexp){
        substr = new RegExp(regexp, 'g');
      }
      if(!substr){
        throw new Error('esdoc-replace-plugin substr is undefined!');
      }
      // console.log('[replace]' + filepath + ':', substr, '->', replacement);
      fileText = fileText.replace(substr, replacement);
    });
    fs.writeFileSync(filepath, fileText, "utf-8");
  }
}
