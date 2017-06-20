<template>
	<div id="app">
		<!--顶部标题栏-->
		<mt-header fixed title="豆瓣APP"></mt-header>
	
		<!--中间路由展示区域-->
		<router-view></router-view>
	
		<!--底部TabBar 电影、图书、音乐选项卡-->
		<div class="tabbar">
			<router-link to="/movies">
				<div class="tabbar-item" :class="{selected: isMovies}">
					电影
				</div>
			</router-link>
			<router-link to="/books">
				<div class="tabbar-item" :class="{selected: isBooks}">
					图书
				</div>
			</router-link>
			<router-link to="/musics">
				<div class="tabbar-item" :class="{selected: isMusics}">
					音乐
				</div>
			</router-link>
		</div>
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
.tabbar {
	width: 100%;
	height: 50px;
	background-color: #0094ff;
	position: fixed;
	bottom: 0;
	display: flex;
}

.tabbar a {
	width: 30%;
	height: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 18px;
	flex-grow: 1;
}


.selected {
	position: relative;
	color: red;
}

.selected::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 2px;
	background-color: red;
	top: 0;
	left: 0;
}
</style>
