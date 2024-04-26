/**
 * @description prettier 配置文件
 * @extends https://prettier.io/docs/en/options.html
 */

module.exports = {
  tabWidth: 2, // 缩进2空格
  semi: false, // 语句结束没有分号
  singleQuote: true, // 字符串使用单引号
  arrowParens: 'avoid', // 箭头函数，只有一个参数的时候，不需要括号
  trailingComma: 'none', // 对象末尾属性无逗号
  bracketSpacing: true, // 对象大括号内的首尾需要空格 -> { foo: bar }
  bracketSameLine: false, // jsx 标签的反尖括号需要换行
  jsxSingleQuote: false, // jsx 标签的脚本部分是否强制单引号
  endOfLine: 'lf' // 换行符使用 lf
}
