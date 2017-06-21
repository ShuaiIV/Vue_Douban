<template>
	<div class="main">
		<mt-navbar class="nav-bar" fixed v-model="selected">
			<mt-tab-item id="1">正在热映</mt-tab-item>
			<mt-tab-item id="2">即将上映</mt-tab-item>
			<mt-tab-item id="3">Top250</mt-tab-item>
		</mt-navbar>
	
		<!-- tab-container -->
		<submovieslist :URL="urlLink"></submovieslist>
	
	</div>
</template>

<script>
// 导入电影列表子组件
import subMoviesList from '../subComponents/subMoivesList.vue'

export default {
	data() {
		return {
			selected: "1",
			urlLink: 'v2/movie/in_theaters',
		}
	},
	methods: {
		// 改变请求地址
		changeUrl() {
			switch (this.selected) {
				case "1":
					this.urlLink = 'v2/movie/in_theaters'
					break;
				case "2":
					this.urlLink = 'v2/movie/coming_soon'
					break;
				case "3":
					this.urlLink = 'v2/movie/top250'
					break;
				default:
					break;
			}
		}
	},
	watch: {
		selected: function (n, o) {
			// console.log(n, o);
			this.changeUrl();
		}
	},
	// 注册子组件
	components: {
		submovieslist: subMoviesList
	}
}
</script>

<style scoped>
.nav-bar {
	top: 40px;
}

</style>
