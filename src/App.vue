<template>
	<div>
		<!--顶部标题栏-->
		<mt-header fixed title="豆瓣APP"></mt-header>
		<!--全局返回按钮-->
		<div v-show="isShow" @click="goBack" class="goBackStyle">&lt;返回</div>
	
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
			<router-link to="/search">
				<div class="tabbar-item" :class="{selected: isSearch}">
					搜索
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
			isMusics: false,
			isSearch: false,
			isShow: false

		}
	},
	created() {
		this.load()
	},
	methods: {
		// 切换navbar样式的方法
		tabNavBar() {
			switch (this.$route.path.split('/')[1]) {
				case 'movies':
					this.isMovies = true;
					this.isBooks = false;
					this.isMusics = false;
					this.isSearch = false;
					break;
				case 'books':
					this.isMovies = false;
					this.isBooks = true;
					this.isMusics = false;
					this.isSearch = false;
					break;
				case 'musics':
					this.isMovies = false;
					this.isBooks = false;
					this.isMusics = true;
					this.isSearch = false;
					break;
				case 'search':
					this.isMovies = false;
					this.isBooks = false;
					this.isMusics = false;
					this.isSearch = true;
					break;
				default:
					break;
			}
		},
		// 返回按钮的方法
		goBack() {
			this.$router.go(-1)
		},
		// 显示隐藏返回按钮的方法
		showOrHidden(path) {
			if (path == '/movies' || path == '/books'
				|| path == '/musics' || path == '/search') {
				this.isShow = false
			} else {
				this.isShow = true
			}
		},
		// 初次加载时
		load() {
			this.tabNavBar();
			this.showOrHidden(this.$route.path);
		}
	},
	// 监听路由变化
	watch: {
		'$route': function (newValue, oldValue) {
			this.tabNavBar();
			this.showOrHidden(this.$route.path);
		}
	},
	// 重新加载时
	mounted() {
		window.addEventListener('load', this.load)
	}
}
</script>

<style scoped>
.goBackStyle {
	position: fixed;
	left: 10px;
	top: 10px;
	z-index: 1;
	color: white;
	font-size: 14px;
	font-weight: 700;
}

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
