<template>
	<div v-if="isLoading">
		<div class="tab-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" id="in_theaters">
			<div v-for="item in musicsList" :key="item.id" class="music-item">
				<router-link :to="'/musics/musicdetail/' + item.id">
					<img v-lazy="item.image" />
					<p>{{item.title}}</p>
					<span v-for="authorName in item.author">{{authorName.name}} </span>
				</router-link>
			</div>
	
		</div>
		<!--显示没有更多数据-->
		<span v-if="start >= total" class="noMore">----没有更多内容啦----</span>
	</div>
</template>

<script>
// 导入共用的common.js 文件
import common from '../common/common.js'

// 导入mint-ui的加载动画组件
import { Indicator } from 'mint-ui';

export default {
	data() {
		return {
			musicsList: [],
			start: 0,
			total: 0,
			allLoaded: false,
			isLoading: false
		}
	},
	created() {
		this.getmusicInTheaters(0);
	},
	methods: {
		// 获取正在相关类型音乐信息的方法
		getmusicInTheaters(start) {
			// 显示正在加载动画
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			// 拼接请求地址URL
			const url = common.apihost + this.URL + '&count=10&start=' + start;

			// 发送Ajax请求
			this.$http.jsonp(url).then(res => {
				// console.log(res);
				this.total = res.body.total;
				if (this.start == 0) {
					this.musicsList = res.body.musics;
				} else {
					this.musicsList = this.musicsList.concat(res.body.musics);
				}
				// 关闭加载动画
				Indicator.close();
				this.isLoading = true;
			}, err => { });
		},
		loadMore() {
			if (this.total == 0) {
				return false;
			}
			this.start += 10;
			this.loading = this.total < this.start;
			if (this.loading == true) {
				return false;
			}
			this.getmusicInTheaters(this.start);
			// console.log(this.start, this.total)
		}
	},
	watch: {
		URL: function () {
			this.start = 0;
			this.getmusicInTheaters(0);
		}
	},
	// 接受父组件传来的参数
	props: ['URL']
}
</script>

<style scoped>
.tab-container {
	width: 100%;
	padding: 55px 0 0;
}

.tab-container::after {
	clear: both;
	content: '.';
	display: block;
	width: 0;
	height: 0;
	visibility: hidden;
}

.music-item {
	width: 44%;
	height: 220px;
	float: left;
	margin-left: 4%;
	margin-bottom: 10px;
	box-sizing: border-box;
	padding: 5px;
	border: 1px solid #ccc;
	box-shadow: 4px 4px 4px #ccc;
}

.music-item img {
	width: 100%;
	height: 160px;
	box-shadow: 2px 2px 2px #ccc;
}

image[lazy=loading] {
	width: 100%;
	height: 160px;
	margin: auto;
}

.music-item p {
	font-size: 16px;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.music-item span {
	display:block;
	font-size: 12px;
	padding-top: 3px;
	line-height: 12px;
	color: #666;
	text-align: center;
}


.noMore {
	display: block;
	text-align: center;
	font-size: 14px;
	color: #aaa;
	padding: 10px;
}
</style>
