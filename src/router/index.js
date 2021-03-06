import Vue from 'vue'
import Router from 'vue-router'

// 导入电影相关路由
import movies from '../components/movies/movies.vue'
// 导入电影详情页的路由
import movieDetail from '../components/movies/movieDetail.vue'

// 导入图书相关路由
import books from '../components/books/books.vue'
// 导入图书详情页的路由
import bookDetail from '../components/books/bookDetail.vue'

// 导入音乐相关路由
import musics from '../components/musics/musics.vue'
// 导入音乐详情页的路由
import musicDetail from '../components/musics/musicDetail.vue'

// 导入搜索页面路由
import search from '../components/search/search.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', redirect: '/movies' },
		{ path: '/movies', component: movies },
		{ path: '/movies/moviedetail/:movieId', component: movieDetail },
		{ path: '/books', component: books },
		{ path: '/books/bookdetail/:bookId', component: bookDetail },
		{ path: '/musics', component: musics },
		{ path: '/musics/musicdetail/:musicId', component: musicDetail },
		{ path: '/search', component: search }
	]
})
