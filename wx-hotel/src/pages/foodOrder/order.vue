<template>
	<view>
		<view class="wrap">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<view class="item" v-for="(item, index) in dataList" :key="index">
					<image :src="`http://localhost:3000/${item.img_url}`"></image>
					<view class="title"><span>姓名:{{item.name}}</span></view>
					<view class="title "><span>电话:{{item.phone}}</span></view>
					<view class="title "><span>菜品:{{item.foodname}}</span></view>
					<view class="title"><span>下单时间:{{dateFormat(item.order_time)}}</span></view>
					<button v-if="item.status == 1" @click='show2(item)' class="btn" disabled>已下单</button>
					<button v-else-if="item.status == 3" disabled class="btn">已送达</button>
					<button v-else disabled class="btn">订单已取消</button>
					<view class="cacel">
						<button v-if="item.status == 1" class="btn" @click='show2(item)'>取消订单</button>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import {
		ref,
		computed
	} from 'vue'
	import {
		cancelApi,
		getOrderListApi,
	} from '../../api/food.js'
	import {
		wxLoginApi
	} from '../../api/user.js'
	// const tabs = ref(null)

	const dataList = ref([])

	const currents = ref(0)
	const swiperCurrent = ref(0)
	const tabsHeight = ref(0)
	const dx = ref(0)
	const showPopup = ref(false)
	const open_id = ref('')

	// const loginApi = () => {
	// 	uni.login({
	// 		provider: 'weixin',
	// 		success: (loginRes) => {
	// 			// console.log(loginRes.code);
	// 			const {
	// 				code
	// 			} = loginRes
	// 			uni.request({
	// 				url: 'http://localhost:3000/wxapi/user/wxLogin',
	// 				method: 'POST',
	// 				data: {
	// 					code
	// 				},
	// 				success: (res) => {
	// 					// console.log(res.data.data);
	// 					// 在获取到小程序的openid后，将其保存到本地缓存
	// 					uni.setStorage({
	// 						key: 'open_id',
	// 						data: res.data.data, // 这里是你获取到的openid
	// 						success: function() {
	// 							console.log('成功保存openid到本地缓存');
	// 						}
	// 					});
	// 				}
	// 			})
	// 		}
	// 	})
	// }

	onLoad(() => {
		// loginApi()
		// getOrderList();
	})


	// 获取数据
	const getOrderList = async (idx) => {
		let res = await getOrderListApi()
		open_id.value = uni.getStorageSync('open_id')
		// console.log(open_id.value);
		console.log(res.data);
		res.data.forEach(data => {
			if (data.open_id == open_id.value) {
				// console.log(open_id.value);
				// console.log(data);
				dataList.value.push(data)
				// console.log(dataList.value);
			}
			// console.log(res.data);
		})
	}
	
	const show2 = async (data) => {
		console.log(data)
		// getOrderId()
		uni.showActionSheet({
			itemList: ['点击取消'],
			success: (res) => {
				console.log(res.tapIndex);
	
				if (res.tapIndex == 0) {
					let leave = cancelApi(data.id)
					uni.showToast({
						icon: 'success',
						title: '取消成功',
						duration: 2000
					})
					uni.navigateTo({
						url: '../foodOrder/order'
					})
				}
			},
			fail: (err) => {
				console.log(err);
			}
		});
	}
	

	const dateFormat = (time) => {
		let date = new Date(time);
		let year = date.getFullYear();
		// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
		let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		// 拼接
		// return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return year + "-" + month + "-" + day;
	}

	onReady(() => {
		getOrderList();
	})
</script>



<style lang="scss" scoped>
	.item {
		margin: 10rpx;
		padding: 10rpx;
		border: 1px solid #ccc;
		border-radius: 5rpx;
		margin-bottom: 10rpx;

		image {
			width: 100%;
			height: 150px;
		}

		.title {
			font-weight: 600;
		}
		
		.btn {
			width: 100px;
			font-size: 14px;
		}
		.cancel {
			display: inline-block;
			width: 100px;
			font-size: 14px;
		}
	}
</style>