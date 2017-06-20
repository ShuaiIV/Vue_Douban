<template>
	<div id="app">
		<!--顶部标题栏-->
		<mt-header fixed title="豆瓣APP"></mt-header>
	
		<!--电影、图书、音乐选项卡-->
		<mt-navbar>
			<mt-tab-item :class="{selected: isMovies}" id="1">
				<router-link to="/movies">电影</router-link>
			</mt-tab-item>
			<mt-tab-item :class="{selected: isBooks}" id="2">
				<router-link to="/books">图书</router-link>
			</mt-tab-item>
			<mt-tab-item :class="{selected: isMusics}" id="3">
				<router-link to="/musics">音乐</router-link>
			</mt-tab-item>
		</mt-navbar>
	
		<!--中间路由展示区域-->
		<router-view></router-view>
	
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			isMovies: true,
			isBooks: false,
			isMusics: false
		}
	},
	created() {
		this.load()
	},
	methods: {
		// 切换navbar样式的方法
		tabNavBar() {
			switch (this.$route.path) {
				case '/movies':
					this.isMovies = true;
					this.isBooks = false;
					this.isMusics = false;
					break;
				case '/books':
					this.isMovies = false;
					this.isBooks = true;
					this.isMusics = false;
					break;
				case '/musics':
					this.isMovies = false;
					this.isBooks = false;
					this.isMusics = true;
					break;
				default:
					break;
			}
		},
		// 初次加载时
		load() {
			this.tabNavBar();
		}
	},
	// 监听路由变化
	watch: {
		'$route': function (newValue, oldValue) {
			this.tabNavBar()
		}
	},
	// 重新加载时
	mounted() {
		window.addEventListener('load', this.load)
	}
}
</script>

<style scoped>
.selected {
	position: relative;
}
.selected::after {
	content: '';
	position: absolute;
	width: 120px;
	height: 2px;
	background-color: #06f;
	bottom: 5px;
	left: 0;

}
</style>
