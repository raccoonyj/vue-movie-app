import { createRouter, createMemoryHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // Hash, History 모드 설정
  // Hash 모드: URL에 해시(#)를 사용하여 페이지를 구분
  // History 모드: HTML5 History API를 사용하여 페이지를 구분
  history: createMemoryHistory(),
  scrollBehavior() {
    return { top:0 }
  },
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})