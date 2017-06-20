import Vue from 'vue'
import Router from 'vue-router'

// 导入电影相关路由
import movies from '../components/movies/movies.vue'

// 导入图书相关路由
import books from '../components/books/books.vue'

// 导入音乐相关路由
import musics from '../components/musics/musics.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', redirect: '/movies' },
		{ path: '/movies', component: movies },
		{ path: '/books', component: books },
		{ path: '/musics', component: musics },
	]
})
