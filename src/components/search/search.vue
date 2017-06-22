<template>
	<div class="main">
		<!--搜索按钮-->
		<form @submit="search()">
			<mt-search v-model="value"></mt-search>
		</form>
	
		<!--搜索结果-->
		<div v-if="isShow != 0" class="result">
			<ul v-if="moviesList.length != 0" class="movies">
				------电影相关结果------
				<li v-for="item in moviesList" :key="item.id">
					<router-link :to="'/movies/moviedetail/' + item.id">
						<img v-lazy="item.images['large']" />
						<div>
							<p> {{item.title}}</p>
							<p>导演:
								<span v-for="director in item.directors"> {{director.name}} </span>
							</p>
							<p>主演:
								<span v-for="actor in item.casts"> {{actor.name}} </span>
							</p>
							<p>评分:
								<span> {{item.rating.average}}</span>
							</p>
						</div>
					</router-link>
				</li>
	
				<!--加载更多电影相关-->
				<mt-button @click="getMore('movie')" v-if="movieStart < moviesTotal" type="primary" plain icon="more" class="more">加载更多电影相关</mt-button>
				<p v-else class="more">------没有更多电影相关内容啦------</p>
			</ul>
	
			<ul v-if="booksList.length != 0" class="books">
				------图书相关结果------
				<li v-for="item in booksList" :key="item.id">
					<router-link :to="'books/bookdetail/' + item.id">
						<img v-lazy="item.images['large']" />
						<div>
							<p>{{item.title}}</p>
							<p>作者:
								<span>{{item.author.join('、')}}</span>
							</p>
							<p>出版社:
								<span>{{item.publisher}}</span>
							</p>
							<p>出版年份:
								<span>{{item.pubdate}}</span>
							</p>
						</div>
					</router-link>
				</li>
	
				<!--加载更多图书相关-->
				<mt-button @click="getMore('book')" v-if="bookStart < booksTotal" type="primary" plain icon="more" class="more">加载更多图书相关</mt-button>
				<p v-else class="more">------没有更多图书相关内容啦------</p>
			</ul>
			<ul v-if="musicsList.length != 0" class="musics">
				------音乐相关结果------
				<li v-for="item in musicsList" :key="item.id">
					<router-link to="'/musics/musicdetail/' + item.id">
						<img v-lazy="item.image" />
						<div>
							<p>{{item.title}}</p>
							<p>演出者:
								<span v-for="author in item.author">{{author.name}} </span>
							</p>
							<p v-if="item.attrs.pubdate != undefined">年份:
								<span>{{item.attrs.pubdate.join('')}}</span>
							</p>
						</div>
					</router-link>
				</li>
	
				<!--加载更多音乐相关-->
				<mt-button @click="getMore('music')" v-if="musicStart < musicsTotal" type="primary" plain icon="more" class="more">加载更多音乐相关</mt-button>
				<p v-else class="more">------没有更多音乐相关内容啦------</p>
			</ul>
	
			<!--未搜索到任何结果时-->
			<p class="more" v-if="moviesTotal == 0 && musicsTotal == 0 && booksTotal == 0">没有搜索到任何相关内容，真是抱歉呢~</p>
		</div>
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
			value: '',
			moviesList: [],
			musicsList: [],
			booksList: [],
			moviesTotal: -1,
			movieStart: -1,
			musicsTotal: -1,
			musicStart: 0,
			booksTotal: 0,
			bookStart: 0,
			isLoading: 0,
			isShow: 0
		}
	},
	methods: {
		// 搜索方法
		getSearch(type, start) {



			// 将isLoading+1 表示正在加载数增加了一个
			this.isLoading += 1;

			// 显示正在加载动画
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});

			// 搜索相关
			// 拼接请求地址
			const url = common.apihost + 'v2/' + type + '/search?' + 'count=10&start=' + start + '&q=' + this.value;
			// 发送Ajax请求
			this.$http.jsonp(url).then(res => {
				console.log(res);
				// 根据传入的搜索类型赋值响应
				switch (type) {
					case 'movie':
						this.moviesList = start == 0 ? res.body.subjects : this.moviesList.concat(res.body.subjects);
						this.moviesTotal = res.body.total;
						this.movieStart = start;
						this.movieStart += 10;

						break;
					case 'music':
						this.musicsList = start == 0 ? res.body.musics : this.musicsList.concat(res.body.musics);
						this.musicsTotal = res.body.total;
						this.musicStart = start;
						this.musicStart += 10;
						break;
					case 'book':
						this.booksList = start == 0 ? res.body.books : this.booksList.concat(res.body.books);
						this.booksTotal = res.body.total;
						this.bookStart = start;
						this.bookStart += 10;
						break;
					default:
						break;
				}

				// 请求完成后，将isLoading -1,表示正在请求数完成了一个
				this.isLoading -= 1;


				// 判断现在的isLoading,若为0，则表示所有请求都已完成
				if (this.isLoading == 0) {
					// 关闭加载动画
					Indicator.close();
					this.isShow++;
				}


			}, err => { })
		},
		search() {
			// 一次新的搜索，将原来的列表隐藏
			this.isShow = 0;

			this.getSearch('movie', 0);
			this.getSearch('book', 0);
			this.getSearch('music', 0);
			// 禁用默认跳转
			return false;
		},
		// 加载更多搜索结果的方法
		getMore(type) {
			switch (type) {
				case 'movie':
					this.getSearch('movie', this.movieStart);
					break;
				case 'music':
					this.getSearch('music', this.musicStart);
					break;
				case 'book':
					this.getSearch('book', this.bookStart);
					break;
				default:
					break;
			}


		}
	}
}
</script>

<style scoped>
.result {
	padding-top: 60px;
}

.result ul {
	width: 100%;
	text-align: center;
}

.result ul li {
	margin-top: 10px;
	height: 120px;
	padding: 10px;
}

.result ul li::after {
	clear: both;
	content: '.';
	display: block;
	width: 0;
	height: 0;
	visibility: hidden;
}

.result ul li img {
	width: 30%;
	height: 100%;
	float: left;
	margin-left: 10px;
}

.result ul li div {
	float: right;
	text-align: left;
	width: 60%;
}

.result ul li div p {
	color: #222;
	font-size: 14px;
}

.result ul li div p:first-of-type {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 5px;
	color: #000;
}

.result ul li div p span {
	font-size: 13px;
	color: #666;
}

.more {
	margin: 10px auto;
	text-align: center;
}
</style>
