/**
 * @description eslint 配置文件
 * @extends https://cn.eslint.org/docs/rules/
 */

module.exports = {
  // 1.根目录：当前 .eslintrc.js 所在目录即为根目录，eslint 规则将被限制到该目录下
  root: true,
  // 2.检测环境
  env: {
    commonjs: true,
    es2021: true, // 在浏览器环境下启动 eslint，使用 canvas 相关 interface 不会报错
    node: true // 在 node 环境下启动 eslint，使用 require 相关 interface 不会报错
  },
  // 3.解析器
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 4.扩展：配置 eslint 预设规则
  extends: [
    'standard', // 使用 eslint-config-standard 预设
    'prettier' // 使用 eslint-config-prettier 关闭两者冲突规则
  ],
  // 5.插件
  plugins: [
    'prettier' // eslint-plugin-prettier 指定 eslint 使用 prettier 格式化代码
  ],
  /**
   * 6.自定义规则
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误（不会导致程序退出）
   * "error" 或 2 - 开启规则，使用错误级别的错误（当被触发的时候，程序会退出）
   */
  rules: {},
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ]
}
