<template>
	<div class="main">
		<!--这是图书页-->
		<mt-navbar class="nav-bar" fixed v-model="selected">
			<mt-tab-item id="1">小说</mt-tab-item>
			<mt-tab-item id="2">散文</mt-tab-item>
			<mt-tab-item id="3">传记</mt-tab-item>
		</mt-navbar>
	
		<subbookslist :URL="urlLink"></subbookslist>

	</div>
</template>

<script>
// 导入图书列表子组件
import subBooksList from '../subComponents/subBooksList.vue'

export default {
	data() {
		return {
			selected: "1",
			urlLink: 'v2/book/search?tag=小说',

		}
	},
	methods: {
		// 改变请求地址
		changeUrl() {
			switch (this.selected) {
				case "1":
					this.urlLink = 'v2/book/search?tag=小说'
					break;
				case "2":
					this.urlLink = 'v2/book/search?tag=散文'
					break;
				case "3":
					this.urlLink = 'v2/book/search?tag=传记'
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
		subbookslist: subBooksList
	}
}

</script>

<style scoped>
.nav-bar {
	top: 40px;
}
</style>