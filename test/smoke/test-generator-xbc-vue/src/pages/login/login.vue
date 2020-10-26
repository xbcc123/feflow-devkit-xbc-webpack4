<template>
	<div class="conBigDiv">
		<div id="loginBig">
			<el-row>
				<el-col :span="12">
					<img
						src="/static/images/loginImg/leftIco.png"
						class="leftIco"
					/>
				</el-col>
				<el-col :span="12">
					<div class="loginRight">
						<div class="loginRightOne">
							<img
								src="/static/images/loginImg/logoIco2.png"
								class="logoIco"
							/>
						</div>
						<div class="loginRightTwo">
							<el-input
								v-model="userName"
								placeholder="请输入用户名"
								size="large"
							>
								<template slot="prepend">
									<i class="iconfont icon-yonghuming"></i>
								</template>
							</el-input>
							<br />
							<el-input
								ref="userPassword"
								v-model="userPassword"
								placeholder="请输入密码"
								type="password"
								size="large"
							>
								<template slot="prepend">
									<i
										slot="prefix"
										class="iconfont icon-mima"
									></i>
								</template>
							</el-input>
						</div>
						<div class="loginRightThree">
							<el-button
								type="primary"
								class="loginBtn"
								@click="loginFun"
							>
								登 录
							</el-button>
						</div>
					</div>
				</el-col>
			</el-row>
			<div class="divVersion">
				<div>当前版本系统V0.0.1</div>
			</div>
		</div>
	</div>
</template>
<script>
import app from "@/global"
export default {
	data() {
		return {
			userName: "",
			userPassword: ""
		}
	},
	created() {
		this.created_fun()
	},
	methods: {
		created_fun() {
			document.onkeydown = e => {
				let dom = this.$refs.userPassword
				if (dom && (e.code == "Enter" || e.code == "NumpadEnter")) {
					this.loginFun()
				}
			}
		},
		loginFun() {
			let params = {
				loginName: this.userName,
				password: this.userPassword
			}
			app.$api.login(params).then(res => {
				localStorage.removeItem("pathData")
				localStorage.removeItem("threeMenu")
				localStorage.removeItem("threeMenuURL")
				localStorage.removeItem("sjyUserId")
				localStorage.removeItem("sjyUserName")
				localStorage.removeItem("customerObj")
				if (res.data.code == 200) {
					localStorage.accessToken = res.data.data
					this.setCookie("heheToken", res.data.data)
					this.$message({
						duration: 1500,
						showClose: true,
						message: "登录成功，正在跳转中！",
						type: "success"
					})
					this.$router.push("/index")
				}
			})
		},
		setCookie(c_name, value) {
			document.cookie =
				c_name + "=" + escape(value) + ";path=/;domain=localhost"
		}
	}
}
</script>

<style scoped lang="scss">
.conBigDiv {
	height: 100%;
	background-image: url("/static/images/loginImg/background.png");
	text-align: center;
	padding-top: 10%;

	.title {
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 10px;
		margin-bottom: 10px;
	}

	.hr {
		border-top: 1px solid #d9d9d9;
		height: 3px;
		margin: 12px 0 12px 0;
	}

	.redfont {
		margin-bottom: 15px;
		padding-left: 10px;
		border-left: 3px solid #e60e32;
		font-size: 15px;
	}

	.red_font {
		color: rgb(230, 14, 50);
	}

	#loginBig {
		background-color: #ffffff;
		width: 1020px;
		height: 460px;
		border-radius: 10px;
		margin: 0 auto;
		text-align: center;
		padding-top: 100px;

		.leftIco {
			margin-left: 100px;
		}

		.loginRight {
			text-align: left;
			padding: 0px 80px 20px 65px;

			.loginRightOne {
				margin-bottom: 15px;
			}

			.loginRightTwo {
				line-height: 60px;
			}

			.loginRightThree {
				padding-top: 104px;
			}

			.loginBtn {
				width: 100%;
			}
		}

		.divVersion {
			margin-top: 70px;
			color: #919599;
			font-size: 12px;
			padding-left: 16px;
			text-align: left;
		}
	}
}
</style>
