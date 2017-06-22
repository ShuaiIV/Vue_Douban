<template>
	<div class="main">
		<!--这是音乐页-->
		<mt-navbar class="nav-bar" fixed v-model="selected">
			<mt-tab-item id="1">流行</mt-tab-item>
			<mt-tab-item id="2">摇滚</mt-tab-item>
			<mt-tab-item id="3">民谣</mt-tab-item>
		</mt-navbar>
	
		<submusicslist :URL="urlLink"></submusicslist>

	</div>
</template>

<script>
// 导入音乐列表子组件
import subMusicsList from '../subComponents/subMusicsList.vue'

export default {
	data() {
		return {
			selected: "1",
			urlLink: 'v2/music/search?tag=流行',

		}
	},
	methods: {
		// 改变请求地址
		changeUrl() {
			switch (this.selected) {
				case "1":
					this.urlLink = 'v2/music/search?tag=流行'
					break;
				case "2":
					this.urlLink = 'v2/music/search?tag=摇滚'
					break;
				case "3":
					this.urlLink = 'v2/music/search?tag=民谣'
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
		submusicslist: subMusicsList
	}
}

</script>

<style scoped>

</style>