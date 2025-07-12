import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' // index라는 이름의 파일은 생략 가능
import store from './store'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(router) // 프로젝트에 특정 플러그인 연결
  .use(store) // Vuex 스토어 연결
  .use(loadImage)
  .mount('#app')