<template>
	<!--index.wxml-->
	<view >
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" mode="aspectFill">
			<image class="avatar" :src="defaultAvatarUrl"></image>
		</button>
		<form @submit="formSubmit">
			<view class="row">
				<view class="text1">昵称：</view>
				<input type="nickname" class="weui-input" name="nickname" placeholder="请输入昵称" />
			</view>
			<button type="primary" style="margin-top: 40rpx;margin-bottom: 20rpx;" form-type="submit">提交</button>
		</form>
	</view>
<!-- <view data-weui-theme="{{theme}}">
    <button class="avatar-wrapper" open-type="chooseAvatar" @bindchoose="onChooseAvatar" mode="aspectFill">
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <form @submit="formSubmit">
      <view class="row">
        <view class="text1">昵称：</view>
        <input type="nickname" class="weui-input" name="nickname" placeholder="请输入昵称" />
      </view>
      <button type="primary" style="margin-top: 40rpx;margin-bottom: 20rpx;" form-type="submit">提交</button>
    </form>
  </view> -->
</template>

<script setup>
	import { ref,onMounted } from 'vue';
	
	const defaultAvatarUrl = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0');
	const app = getApp();
	
	const onChooseAvatar = (e) => {
	  const { avatarUrl } = e.detail;
	  console.log(avatarUrl);
	  defaultAvatarUrl.value = avatarUrl;
	  // app.globalData.userInfo.avatarUrl = avatarUrl;
	  uni.setStorageSync('avatarUrl', avatarUrl)
	  
	};
	
	const formSubmit = (e) => {
	  const { nickname } = e.detail.value;
	  // app.globalData.userInfo.nickName = nickname;
	  // app.globalData.userInfo.avatarUrl = defaultAvatarUrl.value;
	  console.log(nickname);
	  uni.setStorageSync('nickName', nickname)
	  uni.login({
	  	provider: 'weixin',
	  	success: (loginRes) => {
	  		// console.log(loginRes.code);
	  		const {
	  			code
	  		} = loginRes
	  		uni.request({
	  			url: 'http://localhost:3000/wxapi/user/wxLogin',
	  			method: 'POST',
	  			data: {
	  				code
	  			},
	  			success: (res) => {
	  				// console.log(res.data.data);
	  				// 在获取到小程序的openid后，将其保存到本地缓存
	  				uni.setStorage({
	  					key: 'open_id',
	  					data: res.data.data, // 这里是你获取到的openid
	  					success: function() {
	  						console.log('成功保存openid到本地缓存');
	  					}
	  				});
	  			}
	  		})
	  	}
	  })
	  wx.switchTab({
	    url: '../index/index',
	  });
	};
	
	
	// let theme = 'light';
	
	// onMounted(() => {
	//   wx.onThemeChange((result) => {
	//     theme = result.theme;
	//   });
	// });
</script>

<style>
	/* index.wxss  参考 */
	.avatar-wrapper {
		padding: 0;
		width: 56px !important;
		border-radius: 8px;
		margin-top: 40px;
		margin-bottom: 40px;
		background-color: #fff;
	}

	.avatar {
		display: block;
		width: 56px;
		height: 56px;
	}


	.container {
		display: flex;
	}

	.row {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
		height: 80rpx;
		padding-left: 20rpx;
	}

	.text1 {
		flex: 2;
	}

	.weui-input {
		flex: 6;
	}
</style>