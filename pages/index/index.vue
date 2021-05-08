<template>
	<view class="page">
		<view class="poster" v-if="!show_poster">
			<lPainter :board="posterObj" ref="painter"></lPainter>
			<view class="footer-btn">
				<view style="">
					编辑海报模板
				</view>
				<view class="save" @click="toSave">
					下一步
				</view>
			</view>
		</view>
		<view class="poster-btn">
			<view :class="{'is-check':check_idx==index}" v-for="(item,index) in footer_arr" :key="index" @click="toChoose(index)">
				<image :src="item" mode=""></image>
				<view v-if="check_idx==index"></view>
			</view>
		</view>
		<!-- 生成的图片 -->
		<uni-popup type="center" ref="posterImg" :maskClick="false">
			<view class="poster-img">
				<text @click="closePopup"></text>
				<image :src="path" mode="" @click="previewImg"></image>
				<!-- #ifdef H5 -->
				<view class="">
					长按图片保存到手机
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view class="">
					点击图片保存到手机
				</view>
				<!-- #endif -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	let api = require('../../services/template')
	import uniPopup from "../../components/uni-popup/uni-popup.vue";
	import lPainter from '../../components/lime-painter/index.vue'
	export default {
		components: {
			lPainter,
			uniPopup
		},
		data() {
			return {
				show_poster:false,//显示海报
				path: '', //生成的图片地址
				posterObj: {
					width: '670rpx',
					height: '928rpx',
					background: '#fff',
					borderRadius: '16rpx',
					views: [{
							type: 'image',
							src: '',
							css: {
								width: '128rpx',
								height: '50rpx',
								left: '542rpx',
								top: '0rpx',
							}
						},
						{
							type: 'image',
							src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
							css: {
								left: '32rpx',
								top: '32rpx',
								borderRadius: '50%',
								width: '80rpx',
								height: '80rpx'
							}
						},
						{
							type: 'text',
							text: '厦门吴彦祖',
							css: {
								fontSize: '28rpx',
								fontWeight: 'bold',
								color: '#1A2033',
								lineHeight: '28rpx',
								left: '136rpx',
								top: '39rpx'
							}
						},
						{
							type: 'text',
							text: '邀请您一起扫码看直播',
							css: {
								fontSize: '24rpx',
								color: '#4070FF',
								lineHeight: '24rpx',
								left: '136rpx',
								top: '80rpx'
							}
						},
						{
							type: 'image',
							src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
							css: {
								left: '32rpx',
								top: '144rpx',
								width: '606rpx',
								height: '341rpx',
								borderRadius: '16rpx'
							}
						},
						{
							type: 'text',
							text: '云现场 | 2020年 麓客城市 WO-LUNTEER创想礼·麓客共创之夜',
							css: {
								fontSize: '32rpx',
								color: '#1A2033',
								fontWeight: 'bold',
								lineHeight: '45rpx',
								left: '32rpx',
								top: '509rpx',
								width: '606rpx'
							}
						},
						{
							type: 'qrcode',
							text: 'https://www.yun-live.com/',
							css: {
								left: '235rpx',
								top: '631rpx',
								width: '200rpx',
								height: '200rpx',
							}
						},
						{
							type: 'text',
							text: '————  由云现场提供技术支持  ————',
							css: {
								left: '0',
								top: '863rpx',
								width: '100%',
								textAlign: 'center',
								fontSize: '24rpx',
								color: '#989FB3',
								lineHeight: '33rpx'
							}
						}
					]
				}, //画板数据
				footer_arr: [
					'https://s.yun-live.com/images/20210201/d502979c734077930cee837739ee9285.png',
					'https://s.yun-live.com/images/20210201/0289000561415e1f9f6e542a3553906d.png',
					'https://s.yun-live.com/images/20210201/5d2e237728e1dd8727835ca95084721e.png',
					'https://s.yun-live.com/images/20210201/15075d31c26cc446333d569b0d2346e8.png',
					'https://s.yun-live.com/images/20210201/8f4bbf78cab7a20079992c69e997e30b.png',
					'https://s.yun-live.com/images/20210201/6e716c556d1a80e90ecb0260e0990add.png'
				], //底部选项
				check_idx: 0, //底部选中的下标
			}
		},
		onLoad() {
			let t = this
			t.queryTemplates();
		},
		watch: {
			// check_idx(newVal,oldVal){
			// 	console.log(111,newVal);
			// 	console.log(222,oldVal);
			// }
		},
		methods: {
			//获取模板
			queryTemplates: function(){
				let self = this
				api.queryTemplate({
					
				}).then(res => {
					console.log("数据："+JSON.stringify(res))
					if(res.result.retcode === '0000') {
							
					} else {
						self.$toast("数据库操作失败：" + res.result.errMsg)
					}
				}).catch( err => {
					self.$toast('查询模板出错，请稍后再试：' + err)
				})
			},
			previewImg(){
				// #ifdef H5
				return;
				// #endif
				uni.previewImage({
					current:this.path,
					urls: [this.path]
				});
			},
			closePopup(){
				this.$refs.posterImg.close();
				this.show_poster=false;
			},
			toSave() {
				uni.showLoading({
					title:'海报生成中',
				})
				const painter = this.$refs.painter;
				painter.canvasToTempFilePath().then(res => {
					this.path = res.tempFilePath;
					this.$refs.posterImg.open();
					this.show_poster=true;
					uni.hideLoading()
				});
			},
			getImg(r) {

			},
			toChoose(index) {
				if (index == 5) return;
				this.check_idx = index;
				switch (index) {
					case 0:
					this.posterObj.background='#fff';
						this.posterObj.views = [{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/9a4e7df322dc5c9f30ea9b126d3269a6.png',
								css: {
									width: '128rpx',
									height: '50rpx',
									left: '542rpx',
									top: '0rpx',
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
								css: {
									left: '32rpx',
									top: '32rpx',
									borderRadius: '50%',
									width: '80rpx',
									height: '80rpx'
								}
							},
							{
								type: 'text',
								text: '厦门吴彦祖',
								css: {
									fontSize: '28rpx',
									fontWeight: 'bold',
									color: '#1A2033',
									lineHeight: '28rpx',
									left: '136rpx',
									top: '39rpx'
								}
							},
							{
								type: 'text',
								text: '邀请您一起扫码看直播',
								css: {
									fontSize: '24rpx',
									color: '#4070FF',
									lineHeight: '24rpx',
									left: '136rpx',
									top: '80rpx'
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
								css: {
									left: '32rpx',
									top: '144rpx',
									width: '606rpx',
									height: '341rpx',
									borderRadius: '16rpx'
								}
							},
							{
								type: 'text',
								text: '云现场 | 2020年 麓客城市 WO-LUNTEER创想礼·麓客共创之夜',
								css: {
									fontSize: '32rpx',
									color: '#1A2033',
									fontWeight: 'bold',
									lineHeight: '45rpx',
									left: '32rpx',
									top: '509rpx',
									width: '606rpx'
								}
							},
							{
								type: 'qrcode',
								text: 'https://www.yun-live.com/',
								css: {
									left: '235rpx',
									top: '631rpx',
									width: '200rpx',
									height: '200rpx',
								}
							},
							{
								type: 'text',
								text: '————  由云现场提供技术支持  ————',
								css: {
									left: '0',
									top: '863rpx',
									width: '100%',
									textAlign: 'center',
									fontSize: '24rpx',
									color: '#989FB3',
									lineHeight: '33rpx'
								}
							}
						]
						break;
					case 1:
						this.posterObj.views = [{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/39ae4d9d8ad0b1acac7c224e845c641f.png',
								css: {
									left: '0',
									top: '0',
									width: '100%',
									height: '100%'
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/a887643c62a1748fe5f71a5fccfcacaa.png',
								css: {
									width: '128rpx',
									height: '50rpx',
									left: '542rpx',
									top: '0rpx',
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
								css: {
									left: '32rpx',
									top: '32rpx',
									borderRadius: '50%',
									width: '80rpx',
									height: '80rpx'
								}
							},
							{
								type: 'text',
								text: '厦门吴彦祖',
								css: {
									fontSize: '28rpx',
									fontWeight: 'bold',
									color: '#D8AB87',
									lineHeight: '28rpx',
									left: '136rpx',
									top: '39rpx'
								}
							},
							{
								type: 'text',
								text: '邀请您一起扫码看直播',
								css: {
									fontSize: '24rpx',
									color: '#FFFFFF',
									lineHeight: '24rpx',
									left: '136rpx',
									top: '80rpx'
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
								css: {
									left: '50%',
									top: '188rpx',
									transform: 'translate(-50%,0)',
									width: '539rpx',
									height: '303rpx',
									borderRadius: '16rpx',
									border:'3rpx solid #B3A498'
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/d88d56843d43b917e2a28550b2a62723.png',
								css: {
									left: '551rpx',
									top: '111rpx',
									width: '103rpx',
									height: '103rpx',
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/247736ffd279276b891ec14db8ed0fd0.png',
								css: {
									left: '43rpx',
									top: '432rpx',
									width: '56.4rpx',
									height: '56.4rpx',
								}
							},
							{
								type: 'text',
								text: '云现场 | 2020年 麓客城市 WO-LUNTEER创想礼·麓客共创之夜',
								css: {
									fontSize: '32rpx',
									color: '#fff',
									fontWeight: 'bold',
									lineHeight: '45rpx',
									left: '71rpx',
									top: '492rpx',
									width: '528rpx'
								}
							},
							{
								type: 'image',
								src: 'https://s.yun-live.com/images/20210201/63a9b504fb745b43b9fe5c0adef8fddb.png',
								css: {
									left: '50%',
									top: '750rpx',
									transform: 'translate(-50%,0)',
									width: '192rpx',
									height: '78rpx',
								}
							},
							{
								type: 'view',
								css: {
									left: '50%',
									top: '630rpx',
									transform: 'translate(-50%,0)',
									width: '160rpx',
									height: '160rpx',
									background: '#fff',
								}
							},
							{
								type: 'qrcode',
								text: 'https://www.yun-live.com/',
								css: {
									left: '50%',
									top: '638rpx',
									transform: 'translate(-50%,0)',
									width: '144rpx',
									height: '144rpx',
								}
							},
							{
								type: 'text',
								text: '————  由云现场提供技术支持  ————',
								css: {
									left: '0',
									top: '863rpx',
									width: '100%',
									textAlign: 'center',
									fontSize: '24rpx',
									color: '#B3A498',
									lineHeight: '33rpx'
								}
							},
						]
						break;
						case 2:
							this.posterObj.views = [{
									type: 'image',
									src: 'https://s.yun-live.com/images/20210201/78f227bd701da20676c9da9166ce3144.png',
									css: {
										left: '0',
										top: '0',
										width: '100%',
										height: '100%'
									}
								},
								{
									type: 'image',
									src: 'https://s.yun-live.com/images/20210201/cf86cf793964d1b2ded6dd9a0c5fdd5e.png',
									css: {
										width: '128rpx',
										height: '50rpx',
										left: '542rpx',
										top: '0rpx',
									}
								},
								{
									type: 'image',
									src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
									css: {
										left: '56rpx',
										top: '72rpx',
										borderRadius: '50%',
										width: '80rpx',
										height: '80rpx'
									}
								},
								{
									type: 'text',
									text: '厦门吴彦祖',
									css: {
										fontSize: '28rpx',
										fontWeight: 'bold',
										color: '#1D1D25',
										lineHeight: '28rpx',
										left: '160rpx',
										top: '80rpx'
									}
								},
								{
									type: 'text',
									text: '邀请您一起扫码看直播',
									css: {
										fontSize: '24rpx',
										color: '#6CB37A',
										lineHeight: '24rpx',
										left: '160rpx',
										top: '121rpx'
									}
								},
								{
									type: 'image',
									src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
									css: {
										left: '50%',
										top: '188rpx',
										transform: 'translate(-50%,0)',
										width: '540rpx',
										height: '303rpx',
										borderRadius: '16rpx',
										border:'3rpx solid rgba(255,255,255,0.5)'
									}
								},
								{
									type: 'text',
									text: '云现场 | 2020年 麓客城市 WO-LUNTEER创想礼·麓客共创之夜',
									css: {
										fontSize: '32rpx',
										color: '#1D1D25',
										fontWeight: 'bold',
										lineHeight: '45rpx',
										left: '71rpx',
										top: '508rpx',
										width: '530rpx'
									}
								},
								{
									type: 'view',
									css: {
										left: '50%',
										top: '630rpx',
										transform: 'translate(-50%,0)',
										width: '160rpx',
										height: '160rpx',
										background: '#fff',
									}
								},
								{
									type: 'qrcode',
									text: 'https://www.yun-live.com/',
									css: {
										left: '50%',
										top: '638rpx',
										transform: 'translate(-50%,0)',
										width: '144rpx',
										height: '144rpx',
									}
								},
								{
									type: 'text',
									text: '————  由云现场提供技术支持  ————',
									css: {
										left: '0',
										top: '819rpx',
										width: '100%',
										textAlign: 'center',
										fontSize: '24rpx',
										color: '#E5F0F4',
										lineHeight: '33rpx'
									}
								},
							]
							break;
							case 3:
								this.posterObj.views = [{
										type: 'image',
										src: 'https://s.yun-live.com/images/20210201/524ab6a41fe8c7eb57b35df9a547d388.png',
										css: {
											left: '0',
											top: '0',
											width: '100%',
											height: '100%'
										}
									},
									{
										type: 'image',
										src: 'https://s.yun-live.com/images/20210201/c40e25e13d91b275b274ccea8576a0e0.png',
										css: {
											width: '128rpx',
											height: '50rpx',
											left: '542rpx',
											top: '0rpx',
										}
									},
									{
										type: 'image',
										src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
										css: {
											left: '56rpx',
											top: '72rpx',
											borderRadius: '50%',
											width: '80rpx',
											height: '80rpx'
										}
									},
									{
										type: 'text',
										text: '厦门吴彦祖',
										css: {
											fontSize: '28rpx',
											fontWeight: 'bold',
											color: '#1D1D25',
											lineHeight: '28rpx',
											left: '160rpx',
											top: '80rpx'
										}
									},
									{
										type: 'text',
										text: '邀请您一起扫码看直播',
										css: {
											fontSize: '24rpx',
											color: '#6CB37A',
											lineHeight: '24rpx',
											left: '160rpx',
											top: '121rpx'
										}
									},
									{
										type: 'image',
										src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
										css: {
											left: '50%',
											top: '188rpx',
											transform: 'translate(-50%,0)',
											width: '540rpx',
											height: '303rpx',
											borderRadius: '16rpx',
											border:'3rpx solid rgba(255,255,255,0.5)'
										}
									},
									{
										type: 'text',
										text: '云现场 | 2020年 麓客城市 WO-LUNTEER创想礼·麓客共创之夜',
										css: {
											fontSize: '32rpx',
											color: '#1D1D25',
											fontWeight: 'bold',
											lineHeight: '45rpx',
											left: '71rpx',
											top: '508rpx',
											width: '530rpx'
										}
									},
									{
										type: 'view',
										css: {
											left: '50%',
											top: '630rpx',
											transform: 'translate(-50%,0)',
											width: '160rpx',
											height: '160rpx',
											background: '#fff',
										}
									},
									{
										type: 'qrcode',
										text: 'https://www.yun-live.com/',
										css: {
											left: '50%',
											top: '638rpx',
											transform: 'translate(-50%,0)',
											width: '144rpx',
											height: '144rpx',
										}
									},
									{
										type: 'text',
										text: '————  由云现场提供技术支持  ————',
										css: {
											left: '0',
											top: '819rpx',
											width: '100%',
											textAlign: 'center',
											fontSize: '24rpx',
											color: '#E5F0F4',
											lineHeight: '33rpx'
										}
									},
								]
								break;
								case 4:
									this.posterObj.background='linear-gradient(153deg, #EFF7FE 0%, #E6F0FA 100%)'							
									this.posterObj.views = [{
											type: 'image',
											src: 'https://s.yun-live.com/images/20210201/9befed22f44df68a27044ca8a84a39b6.png',
											css: {
												left: '0',
												top: '0',
												width: '150rpx',
												height: '150rpx'
											}
										},
										{
											type: 'image',
											src: 'https://s.yun-live.com/images/20210201/ac22a4d279076116e1e9bea7f5a325e1.png',
											css: {
												width: '128rpx',
												height: '50rpx',
												left: '542rpx',
												top: '0rpx',
											}
										},
										{
											type: 'image',
											src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
											css: {
												left: '35rpx',
												top: '35rpx',
												borderRadius: '50%',
												width: '80rpx',
												height: '80rpx'
											}
										},
										{
											type: 'text',
											text: '厦门吴彦祖',
											css: {
												fontSize: '28rpx',
												fontWeight: 'bold',
												color: '#1D1D25',
												lineHeight: '28rpx',
												left: '152rpx',
												top: '40rpx'
											}
										},
										{
											type: 'text',
											text: '邀请您一起扫码看直播',
											css: {
												fontSize: '24rpx',
												color: '#FF8931',
												lineHeight: '24rpx',
												left: '152rpx',
												top: '80rpx'
											}
										},
										{
											type: 'image',
											src: 'https://s.yun-live.com/images/20210201/4afd6a85e7469ecb61c7377062c5f42c.png',
											css: {
												left: '0',
												top: '94rpx',
												width: '100%',
												height: '473rpx',
											}
										},
										{
											type: 'image',
											src: 'https://s.yun-live.com/images/20210201/eb694718fa6c7b90d60a2c250847a192.jpg',
											css: {
												left: '50%',
												top: '167rpx',
												transform: 'translate(-50%,0)',
												width: '580rpx',
												height: '326rpx',
												borderRadius: '16rpx',
											}
										},
										{
											type: 'text',
											text: '云现场 | 2020年 麓客城市 WO-LUNTEER创想礼·麓客共创之夜',
											css: {
												fontSize: '32rpx',
												color: '#3F4770',
												fontWeight: 'bold',
												lineHeight: '45rpx',
												left: '48rpx',
												top: '534rpx',
												width: '574rpx'
											}
										},
										{
											type: 'image',
											src: 'https://s.yun-live.com/images/20210201/583a28f485b9967d61b71d35ac652e29.png',
											css: {
												left: '50%',
												top: '634rpx',
												transform: 'translate(-50%,0)',
												width: '218rpx',
												height: '218rpx',
											}
										},
										{
											type: 'view',
											css: {
												left: '50%',
												top: '671rpx',
												transform: 'translate(-50%,0)',
												width: '144rpx',
												height: '144rpx',
												background: '#fff',
											}
										},
										{
											type: 'qrcode',
											text: 'https://www.yun-live.com/',
											css: {
												left: '50%',
												top: '678rpx',
												transform: 'translate(-50%,0)',
												width: '130rpx',
												height: '130rpx',
											}
										},
										{
											type: 'text',
											text: '————  由云现场提供技术支持  ————',
											css: {
												left: '0',
												top: '859rpx',
												width: '100%',
												textAlign: 'center',
												fontSize: '24rpx',
												color: '#A4ADC3',
												lineHeight: '33rpx'
											}
										},
									]
									break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style.scss';
</style>
