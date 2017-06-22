<template>
	<div v-if="loading" class="main">
		<!--这是音乐详情页 {{this.$route.params.musicId}}-->
		<h1>
			<span>{{musicDetail.title}}</span>
		</h1>
		<img :src="musicDetail.image" />
		<div class="info">
			<p v-if="musicDetail.alt_title != ''">又名：
				<span>{{musicDetail.alt_title}}</span>
			</p>
			<p>表演者：
				<span v-for="item in musicDetail.author">{{item.name}}、</span>
			</p>
			<p >专辑类型：
				<span>{{musicDetail.attrs.version.join('、')}}</span>
			</p>
			<P>介质：
				<span>{{musicDetail.attrs.media.join('、')}}、</span>
			</P>
			<P>发行时间：
				<span>{{musicDetail.attrs.pubdate.join('、')}}</span>
			</P>
			<P>出版者：
				<span>{{musicDetail.attrs.publisher.join('、')}}</span>
			</P>
		</div>
		<div class="summary">
			曲目----
			<p v-if="musicDetail.attrs.tracks.length != 1" v-for="(item, index) in musicDetail.attrs.tracks">{{index + 1}}、{{item}}</p>
			<p v-else v-html="musicDetail.attrs.tracks[0]"></p>
		</div>
	</div>
</template>

<script>
// 导入公用的common.js文件
import common from '../common/common.js';

// 导入mint-ui的加载动画组件
import { Indicator } from 'mint-ui';

export default {
	data() {
		return {
			musicDetail: {},
			loading: false
		}
	},
	created() {
		this.getmusicDetail();
	},
	methods: {
		// 请求电影详情的方法
		getmusicDetail() {
			// 显示正在加载动画
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});

			// 拼接请求地址URL
			const url = common.apihost + 'v2/music/' + this.$route.params.musicId;

			// 发送Ajax请求
			this.$http.jsonp(url).then(res => {
				// console.log(res.body);
				this.musicDetail = res.body;
				// 关闭加载动画
				Indicator.close();
				this.loading = true;
			}, err => { })
		}
	}
}
</script>

<style scoped>
.main::after {
	clear: both;
	content: '.';
	display: block;
	width: 0;
	height: 0;
	visibility: hidden;
}

h1 {
	padding-top: 5px;
	margin: 5px 10px;
	font-size: 20px;
}

img {
	width: 50%;
	margin-left: 5px;
	box-shadow: 2px 2px 2px #ccc;
}

.info {
	width: 45%;
	float: right;
	font-size: 14px;
	font-weight: bold;
	margin-right: 5px;
	height: 190px;
}

.info p {
	margin-bottom: 10px;
}

.info p span {
	color: #0094ff;
	font-size: 13px;
}

.summary {
	margin: 10px 5px;
	font-weight: bold;
}

.summary p {
	font-weight: normal;
	font-size: 16px;
	white-space: pre;
	padding-left: 15px;
}

</style>
