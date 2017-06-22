<template>
	<div v-if="loading" class="main">
		<!--这是图书详情页 {{this.$route.params.bookId}}-->
		<h1>
			<span>{{bookDetail.title}}</span>
		</h1>
		<img :src="this.images.large" />
		<div class="info">
			<p>作者：
				<span>{{bookDetail.author.join('、')}}</span>
			</p>
			<p>出版社：
				<span>{{bookDetail.publisher}}</span>
			</p>
			<p v-if="bookDetail.translator.length != 0">译者：
				<span>{{bookDetail.translator.join('、')}}</span>
			</p>
			<P>类型：
				<span v-for="item in bookDetail.tags">{{item.title}}、</span>
			</P>
			<P>出版年：
				<span>{{bookDetail.pubdate}}</span>
			</P>
		</div>
		<div class="summary">
			内容简介：
			<p>{{bookDetail.summary}}</p>
		</div>
		<div class="summary">
			作者简介：
			<p>{{bookDetail.author_intro}}</p>
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
			bookDetail: {},
			starsList: [],
			images:{},
			loading: false
		}
	},
	created() {
		this.getbookDetail();
	},
	methods: {
		// 请求电影详情的方法
		getbookDetail() {
			// 显示正在加载动画
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});

			// 拼接请求地址URL
			const url = common.apihost + 'v2/book/' + this.$route.params.bookId;

			// 发送Ajax请求
			this.$http.jsonp(url).then(res => {
				// console.log(res.body);
				this.bookDetail = res.body;
				this.images = res.body.images
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
	height: 278px;
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
	text-indent: 2em;
	font-weight: normal;
	font-size: 8px;
}

</style>
