module.exports = {
  watchman: false,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
  '^vue$': 'vue/dist/vue.runtime.esm-bundler.js',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',   // ✅ 새 버전용 transform
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
  '/node_modules/',
  '/dist/','/build/'
],
  // 추가 (Vue 3 테스트 환경 명시)
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
}
