/**
 * @description @commitlint/cli 配置文件
 */

module.exports = {
  // 1.扩展
  extends: [
    '@commitlint/config-conventional' // 配置检测 commit 信息符合规范
  ],
  // 2.自定义规则
  rules: {
    // 类型枚举：提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'test',
        'refactor',
        'style',
        'build',
        'chore',
        'ci',
        'perf',
        'revert',
        'docs'
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
