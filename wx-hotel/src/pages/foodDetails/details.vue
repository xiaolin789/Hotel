<template>
	<view style="margin-bottom: 100px;">
		<!-- <u-swiper height="400" ></u-swiper> -->
		<image :src="`http://localhost:3000/${list}`" :style="{  width: '100%', height: '160px'}" mode="aspectFill">
		</image>
		<view class="u-p-20">
			<view class="u-m-b-20">
				<u-tag mode='dark' text='商家自营'></u-tag>
				<text class='u-font-24 u-m-l-20 u-type-info-dark'>商家自营 放心选购</text>
			</view>
			<view class="u-font-36 u-m-b-20">
				{{name}}

			</view>
			<view class="u-m-b-20">
				<text class="price">￥{{price}}</text>
			</view>
			<!-- <u-gap height="20" bg-color="#F5F5F5"></u-gap> -->
		<!-- 	<view class="book" @click="show=true">
				<text>请选择房间号</text>
				<u-icon name='arrow-right'></u-icon>
			</view> -->
			<!-- <u-gap height="20" bg-color="#F5F5F5"></u-gap> -->
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<u-divider color="#0eb6ff" height="60" class="u-m-t-20">详情</u-divider>
			<u-parse>{{content}}</u-parse>
		</view>
	</view>

	<!-- <u-popup v-model="show" mode="bottom" height="70%" border-radius="20">
		<view>
			<view class="u-p-30">
				<view class="u-text-center u-font-30">

				</view>
				<view class="u-flex u-m-b-20 u-flex-wrap">
					<view :class="{ active: gather.indexOf(item.roomId) > -1 }" v-for="(item, index) in roomList"
						:key='index' @click="onPatch(item.roomId)" class="num-item">
						{{item.roomCode}}
					</view>
				</view>
			</view>
			<view class="btns">
				<button style="width: 90;" class="" type="primary" @click="show=false">确定</button>
			</view>
		</view>
	</u-popup> -->
	<view class="btns">
		<button @click="goToInfo" class="bts" type="primary">立即下单</button>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getfoodByIdApi
	} from '../../api/food.js'
	import {
		wxLoginApi
	} from '../../api/user.js'

	const list = ref([])
	const title = ref('')
	const price = ref('')
	const content = ref('')


	const roomList = ref([])

	const toData = ref([])
	// 跳转到确定页面
	const goToInfo = () => {
		//设置提交的数据
		uni.navigateTo({
			url: '../foodInfo/info?infos=' + JSON.stringify(toData)
		})
	}

	// 获取详情
	const getfoodById = async (data) => {
		let res = await getfoodByIdApi(data)
		console.log(res);
		list.value = res.data[0].img_url
		title.value = res.data[0].name
		price.value = res.data[0].price
		content.value = res.data[0].detail
		toData.value = res.data[0]
		// console.log(toData.value);
	}
	
	const loginApi = () => {
		uni.login({
			provider: 'weixin',
			success: (loginRes) => {
				// console.log(loginRes);
				const {code} = loginRes
				uni.request({
					url: 'http://localhost:3000/wxapi/user/wxLogin',
					method: 'POST',
					data: {
						code,
					},
					success: (res) => {
						console.log(res);
					}
				})
			}
		})
	}

	onLoad((options) => {
		console.log(options);
		getfoodById(options.id)
		// userLogin()
		loginApi()
	})
</script>

<style lang="scss">
	.price {
		color: #FF7670;
	}

	.book {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 0rpx;
	}

	.service {
		padding: 25rpx 0rpx;
	}

	.num-item {
		padding: 15rpx 35rpx;
		background: #EFEFEF;
		margin: 5px;
		border-radius: 5px;
	}

	.active {
		padding: 15rpx 35rpx;
		background: #1aad19;
		margin: 5px;
		border-radius: 5px;
		color: #FFF;
	}

	.btns {
		position: fixed;
		bottom: 0px;
		z-index: 1;
		width: 100%;
		background: #FFFFFF;
		height: 120rpx;
	}

	.bts {
		width: 90%;
	}
</style>