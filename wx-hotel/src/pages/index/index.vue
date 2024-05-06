<template>
	<view class="content">
		<swiper class="swipper-container" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
			:interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in swiperList" :key='index'>
				<image
					:style="{backgroundImage: `url(http://localhost:3000/${item.img_url})`, backgroundSize:'cover', width: '100%', height: '150px', backgroundPosition: '50% 50%'}">
				</image>
			</swiper-item>
		</swiper>
		<!-- 分割线 -->
		<u-divider color="#fa3534" class="divider">酒店推荐</u-divider>
		<view class="wrap">
			<!-- <u-button @click="clear">清空列表</u-button> -->
			<u-waterfall v-model="flowList" ref="uWaterfall1">
				<template v-slot:left="{leftList}">
					<view @click="toDetails(item.info_id)" class="demo-warter" v-for="(item, index) in leftList"
						:key="index">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="-450" border-radius="10"
							:image="`http://localhost:3000/${item.img_url.split(',')[0]}`" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.info_name}}
						</view>
						<view class="demo-price">
							{{item.info_price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view @click="toDetails(item.info_id)" class="demo-warter" v-for="(item, index) in rightList"
						:key="index">
						<u-lazy-load threshold="-450" border-radius="10"
							:image="`http://localhost:3000/${item.img_url.split(',')[0]}`" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.info_name}}
						</view>
						<view class="demo-price">
							{{item.info_price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
			<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue"

	import {
		getSwapperListApi,
		getHotListApi
	} from '../../api/home.js'
	import {
		onLaunch,
		onLoad,
		onShow
	} from "@dcloudio/uni-app"


	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const duration = ref(500)
	const interval = ref(2000)



	// 接收轮播图数据
	const swiperList = ref([])
	// 获取轮播图数据
	const getSwapperList = async () => {
		let {
			data
		} = await getSwapperListApi()
		console.log(data);
		swiperList.value = data
	}
	// 列表数据
	// const flowList = reactive({
	// 	list: []
	// })
	const flowList = ref([])
	// 获取热推数据
	const getHotList = async () => {
		let res = await getHotListApi()
		// flowList.value = res.data
		res.data.forEach((data) => {
			// console.log(data);
			if (data.info_recommed == 3 && data.info_book == 0 && data.info_status == 1) {
				console.log(data);
				flowList.value.push(data)
			}
		})
	}

	// 跳转详情
	const toDetails = (info_id) => {
		if (!uni.getStorageSync('avatarUrl') || !uni.getStorageSync('nickName')) {
			uni.navigateTo({
				url: '../auth/auth'
			});
		}
		uni.navigateTo({
			url: '../details/details?info_id=' + info_id
		})
	}

	// onLaunch(() => {
	// 	if (!uni.getStorageSync('avatarUrl') || !uni.getStorageSync('nickName')) {
	// 		uni.navigateTo({
	// 			url: '/pages/auth/auth'
	// 		});
	// 	}
	// })
	
	const login = () => {
		if (!uni.getStorageSync('avatarUrl') || !uni.getStorageSync('nickName')) {
			uni.navigateTo({
				url: '../auth/auth'
			});
		}
	}
	
	// onShow()

	// 获取数据，放到onLoad里面
	onLoad(() => {
		getSwapperList()
		getHotList()
	login()
	})
</script>

<style lang='scss'>
	.content {
		display: flex;
		flex-direction: column;
	}

	.swipper-container {
		height: 150px
	}

	.swipper-container .item {
		height: 100%;
		text-align: center;
		line-height: 150px;
	}

	swiper-item:nth-child(1) .item {
		background-color: bisque;
	}

	swiper-item:nth-child(2) .item {
		background-color: pink;
	}

	swiper-item:nth-child(3) .item {
		background-color: burlywood;
	}

	/* 	.imgs {
		height: 370rpx;
		width: 100%;
	} */

	.divider {
		padding-top: 10px;
		font-size: 32rpx;
	}

	.warp {
		padding: 0px 5px;
	}

	.demo-warter {
		border-radius: 8px;
		/* margin: 5px; */
		background-color: #ffffff;
		padding: 5px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>