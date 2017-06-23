# Vue_Douban

> 基于mint-ui的豆瓣单页Vue应用

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 使用的框架
	vue-cli：
		搭建初始化项目结构
		GitHub地址：github.com/vuejs/vue-cli
	webpack：
		打包项目
		官网地址：webpack.js.org
	Mint-UI
		应用的样式组件，滚动加载，懒加载和加载动画
		官网地址：mint-ui.github.io


### 功能描述

#### 列表相关
	1. 显示最近上映、即将上映和豆瓣top250的电影榜单
	2. 显示小说、散文和传记类型的图书榜单
	3. 显示流行、摇滚和民谣类型的音乐榜单
	4. 图片都使用懒加载的方式
	5. 列表都使用滚动加载方式

#### 详情相关
	在列表页点击卡片，跳转到相应的详情页。基于豆瓣的API渲染相应的数据和内容；未做更深层次的跳转TAT

#### 搜索相关
	1.输入搜索关键词，即可搜索相关的影片、图书和音乐条目；点击亦可跳转到相应的详情页
	2.默认只加载10条影片、图书和音乐条目，如有更多的条目未加载，会显示加载更多按钮，单击即可再加载10条相应的相关条目

#### 已知问题
	1.样式太简陋（实在是没精力调样式）
	2.没有做移动端的屏幕适配。
	2.性能问题：每次切换不同的榜单都会重新请求数据，应将之前请求过的数据存放在localstorage或cookie中，避免请求重复的数据。
	3.详情页内容太少：可以通过获取影片导演和主演、图书作者和音乐演唱者的id，请求其其他的作品，形成作品列表供查阅。
	....待补充，待发现....
