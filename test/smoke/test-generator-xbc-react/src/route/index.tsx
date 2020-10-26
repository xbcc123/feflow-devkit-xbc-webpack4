import { asyncComponent as async } from "./asyncComponent";
import { Route, Switch, Redirect } from "react-router-dom";


// 首页
const Index = async(() =>
	import(/* webpackChunkName: "index" */ "@/pages/index/index")
);

const MobxDemo = async(() =>
	import(/* webpackChunkName: "index" */ "@/pages/demo/mobxDemo")
);


// 404
const NoFund = async(() =>
	import(/* webpackChunkName: "noFund" */ "@/pages/noFund/noFund")
);

// // 登录页面
// const Login = async(() =>
// 	import(/* webpackChunkName: "login" */ "@/pages/Login/Login/Login")
// ); // 登录
// const Register = async(() =>
// 	import(/* webpackChunkName: "register" */ "@/pages/Login/Register/Register")
// ); // 注册
// const BackPw = async(() =>
// 	import(/* webpackChunkName: "backPw" */ "@/pages/Login/backPw/backPw")
// ); // 忘记密码

export default {
	routes: [
		{
			path: "/app",
			component: Index,
			routes: [

			]
		},
		{
			path: "/mobxDemo",
			component: MobxDemo
		},
		// {
		// 	path: "/register",
		// 	component: Register
		// },
		// {
		// 	path: "/backPw",
		// 	component: BackPw
		// },
		{
			path: "*",
			component: NoFund
		}
	]
};
