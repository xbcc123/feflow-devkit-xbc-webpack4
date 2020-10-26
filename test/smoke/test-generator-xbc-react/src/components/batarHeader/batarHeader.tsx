import React from "react";
import { withRouter } from "react-router-dom";
import s from "./batarHeader.scss";
import app from "app";

import { Menu, Dropdown, Icon,Modal,message} from "antd";
const { SubMenu } = Menu;
const { confirm } = Modal;

class BatarHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo:{},
			arrowType:true
		};
	}

	componentDidMount() {
		this.getinfo();
	}

	mouseEnterFun(){
		this.setState({
			arrowType:false
		})
	}

	mouseLeaveFun(){
		this.setState({
			arrowType:true
		})
	}

	getinfo(){
		app.$api.getinfo({}).then((res) => {
			this.setState({
				userInfo:res.data.data
			});

		})
	}

	signOut() {
		let _this = this;
		confirm({
			title: '请确定要退出账号吗？',
			content: '',
			okType: 'primary',
			okText: '确定',
			cancelText: '取消',
			onOk() {
				app.$api.logout({}).then((res) => {
					message.success(res.data.msg);
					app.$storage.remove('token');
					app.$storage.remove('role');
					_this.props.history.push({ pathname: '/login' });
		
				})

			},
			onCancel() {
				console.log('Cancel');
			}
		});
	}

	clickItem(item) {
		this.props.tabList.forEach(it => {
			it.checked = false;
		});
		item.checked = true;
		this.setState({
			item
		});
		this.props.changeSide(item);
	}

	// 点击下拉菜单
	clickMenuItem(options) {
		this.props.history.push(options.menuUrl);
	}

	// 设置菜单
	// setMenu(options) {
	// 	return (
	// 		<>
	// 			{options.childs && (
	// 				<Menu>
	// 					{options.childs.map(item => {
	// 						if (item.childs) {
	// 							return (
	// 								<SubMenu
	// 									title={item.name}
	// 									onClick={() => {
	// 										this.clickMenuItem(item);
	// 									}}
	// 								>
	// 									{item.childs &&
	// 										item.childs.map(it => {
	// 											return (
	// 												<Menu.Item
	// 													onClick={() => {
	// 														this.clickMenuItem(
	// 															item
	// 														);
	// 													}}
	// 												>
	// 													{it.name}
	// 												</Menu.Item>
	// 											);
	// 										})}
	// 								</SubMenu>
	// 							);
	// 						}
	// 						return (
	// 							<Menu.Item
	// 								key={item.id}
	// 								onClick={() => {
	// 									this.clickMenuItem(item);
	// 								}}
	// 							>
	// 								{item.name}
	// 							</Menu.Item>
	// 						);
	// 					})}
	// 				</Menu>
	// 			)}
	// 		</>
	// 	);
	// }

	setMenu(options) {
		if (JSON.stringify(options.childs) === "[]" || !options.childs) {
			return <></>;
		}
		return (
			<Menu>
				{JSON.stringify(options.childs) !== "[]" &&
					options.childs.map(item => {
						return (
							<Menu.Item
								key={item.id}
								onClick={() => {
									this.clickMenuItem(item);
								}}
							>
								{item.name}
							</Menu.Item>
						);
					})}
			</Menu>
		);
	}

	render() {
		//角色权限控制
		let role = app.$storage.get("role");
		let roleFun =(item)=> {
			if(this.props.roleManage[role]){
				return this.props.roleManage[role].indexOf(item.name) === -1
			}else {
				return false
			}
		}
		//用户设置
		const userMenu = (
			<Menu>
			  <Menu.Item>
				  	<div onClick={this.signOut.bind(this)}>退出账号</div>
			  </Menu.Item>
			</Menu>
		);
		const { userInfo,arrowType} = this.state;
		return (
			<div className={s.headerWrap}>
				<div className={s.headerCont}>
					<div className={s.logo}>
						EZDIAMOND
						{/* <img
							src="./images/img-logo.png"
							width="90"
							height="42"
						/> */}
					</div>
					<div className={s.headerTab}>
						{this.props.tabList.map(item => {
							return (
								<div
									className={`${item.checked ? s.on : ""} ${
										s.tit
									}`}
									key={item.name}
									style={{display: roleFun(item) ? "none":''}}
								>
									<Dropdown
										overlay={this.setMenu.call(this, item)}
									>
										<div
											onClick={() => {
												this.clickItem(item);
											}}
										>
											{item.name}
										</div>
									</Dropdown>
								</div>
							);
						})}
						<div
							className={`${s.tit} ${s.userWrap}`}
						>
							<img src="../../../static/images/user.png" alt=""/>
							<div onMouseEnter={this.mouseEnterFun.bind(this)} onMouseLeave={this.mouseLeaveFun.bind(this)}>
								<span className={s.phone}>{userInfo.phone}</span>
								<Dropdown overlay={userMenu}>
									<div className={s.setTitle}>设置  {arrowType?<Icon type="right" style={{fontSize:12}}/>:<Icon type="down" />}</div>
								</Dropdown>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(BatarHeader);
