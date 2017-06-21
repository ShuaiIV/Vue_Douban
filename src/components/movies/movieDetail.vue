<template>
	<div v-if="loading" class="main">
		<!--这是电影详情页 {{this.$route.params.movieId}}-->
		<h1>
			<span>{{movieDetail.title}}</span>
			<span>{{movieDetail.original_title}}</span>
			<span>({{movieDetail.year}})</span>
		</h1>
		<img :src="this.images.large" />
		<div class="info">
			<p v-text="'导演：'">
				
				<span v-for="item in movieDetail.directors">{{item.name}}、</span>
			</p>
			<p>主演：
				<span v-for="item in movieDetail.casts">{{item.name}}、</span>
			</p>
			<P>类型：
				<span v-for="item in movieDetail.genres">{{item}}、</span>
			</P>
			<P>国家：
				<span v-for="item in movieDetail.countries">{{item}}、</span>
			</P>
		</div>
		<div class="summary">
			简介：
			<p>{{movieDetail.summary}}</p>
		</div>
		<p class="stars">
			{{movieDetail.title}}的影人:
		</p>
		<div class="starsList">
			<ul ref="starsListRef">
				<!--导演-->
				<li v-for="item in movieDetail.directors" :key="item.name">
					<img :src="item.avatars.large"/>
					<p>{{item.name}}</p>
					<p>导演</p>
				</li>
				<!--主演-->
				<li v-for="item in movieDetail.casts" :key="item.name">
					<img :src="item.avatars.large"/>
					<p>{{item.name}}</p>
					<p>主演</p>
				</li>
			</ul>
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
			movieDetail: {},
			starsList: [],
			images:{},
			loading: false
		}
	},
	created() {
		this.getMovieDetail();
	},
	methods: {
		// 请求电影详情的方法
		getMovieDetail() {
			// 显示正在加载动画
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});

			// 拼接请求地址URL
			const url = common.apihost + 'v2/movie/subject/' + this.$route.params.movieId;

			// 发送Ajax请求
			this.$http.jsonp(url).then(res => {
				//console.log(res.body);
				this.movieDetail = res.body;
				this.images = res.body.images
				// this.countStarsListLength(res.body.directors, res.body.casts);
				// 关闭加载动画
				Indicator.close();
				this.loading = true;
			}, err => { })
		},
		// // 计算影人列表长度的方法
		// countStarsListLength(arr1, arr2) {
		// 	console.log(this.$refs)
		// 	// this.$refs.starsList.style.width = (arr1.length + arr2.length) * 100 + 'px';

		// }
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

h1>span:nth-of-type(3) {
	color: #888;
}

img {
	margin-top: 10px;
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
}

.info p {
	margin-top: 10px;
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

.stars {
	margin-top: 15px;
	margin-left: 5px;
	font-size: 16px;
	color: #007722;
}
.starsList {
	overflow-x: auto;
	margin-left: 5px;
	margin-bottom: 10px;
}

.starsList ul {
	width: 12000px;
	margin: 10px;
	margin-bottom: 10px;
}

.starsList li {
	float: left;
	list-style: none;
	text-align: center;
	font-size: 14px;
	margin-right: 10px;
}
.starsList li img {
	width: 100px;
	height: 140px;
	margin: 10px;
}
.starsList li p:last-of-type {
	color: #888;
}
</style>
