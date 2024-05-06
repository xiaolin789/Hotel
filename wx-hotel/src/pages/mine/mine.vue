<template>
	<view class="userinfo">
		<view class="img-container">
			<image :src="avatarUrl" class="uimage" ></image>
		</view>
		<u-divider color="black" class="divider">{{nickName}}</u-divider>
	</view>
	<view class="ment-item" @click="toOrder">
		<view class="">
			<u-icon name='order'></u-icon>
			<text class="item-text">我的订单</text>
		</view>
		<view class="">
			<u-icon name='arrow-right'></u-icon>
		</view>
	</view>
	<view class="ment-item" @click="toFood">
		<view class="">
			<u-icon name='order'></u-icon>
			<text class="item-text">菜品订单</text>
		</view>
		<view class="">
			<u-icon name='arrow-right'></u-icon>
		</view>
	</view>
	<view class="ment-item" @click="toSuggest">
		<view class="">
			<u-icon name='edit-pen'></u-icon>
			<text class="item-text">意见反馈</text>
		</view>
		<view class="">
			<u-icon name='arrow-right'></u-icon>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
import { onLoad } from '@dcloudio/uni-app';

	const nickName = ref('.')
	const avatarUrl = ref('/static/user.png')
	// 跳转订单
	const toOrder = () => {
		// if(!uni.getStorageSync('avatarUrl') || !uni.getStorageSync('nickName')){
		// 	uni.getUserProfile({
		// 		desc: 'weixin',
		// 		success: (res) => {
		// 			console.log(res);
		// 			nickName.value = res.userInfo.nickName
		// 			avatarUrl.value = res.userInfo.avatarUrl
		// 			// convertAvatarUrl()
		// 			uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
		// 			uni.setStorageSync('nickName', res.userInfo.nickName)
		// 		}
		// 	})
		// }
		
		uni.navigateTo({
			url: '../order/order'
		})
	}
	
	// const convertAvatarUrl = () => {
	//       uni.getImageInfo({
	//         src: userInfo.avatarUrl,
	//         success: imageInfo => {
	//           // 在成功获取图片信息后，将图片设置为本地图片 URL
	//           avatarUrl.value = imageInfo.path;
	//         },
	//         fail: err => {
	//           console.error('获取图片信息失败：', err);
	//         }
	//       });
	//     }
	  
	
	const toFood = () => {
		uni.navigateTo({
			url: '../foodOrder/order'
		})
	}
	
	// 跳转反馈
	const toSuggest = () => {
		uni.navigateTo({
			url: '../suggest/suggest'
		})
	}
	4
	// const btn = () => {
	// 	uni.navigateTo({
	// 		url: '../auth/auth'
	// 	});
	// }
	// 获取头像点击事件
	const getUserInfo = () => {
		if(uni.getStorageSync('avatarUrl') && uni.getStorageSync('nickName')){
			nickName.value = uni.getStorageSync('nickName')
			avatarUrl.value = uni.getStorageSync('avatarUrl')
		}
	}
	onLoad(() => {
		getUserInfo()
	})
</script>

<style>
	
.userinfo {
	margin: 30rpx 0rpx;
}
.img-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
.uimage {
	height: 50px;
	width: 50px;
	border-radius: 50%;
	margin: 5px 0px;
}
.ment-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	padding: 15px 20px;
	background-color: #FEFEFE;
	border-bottom: 1px solid #EFEFEF;
}
.item-text {
	margin-left: 10rpx;
}
</style>
