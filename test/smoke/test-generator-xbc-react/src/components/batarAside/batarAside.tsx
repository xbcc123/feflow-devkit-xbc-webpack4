import React from "react";
import { Icon } from "antd";
import styles from "./batarAside.scss";
import { withRouter } from "react-router-dom";

import app from "app";

class BatarAside extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		// app.$storage.get('urlHistory')
		// this.props.history.push(this.props.sideList.childs[0].menuUrl);
	}

	componentWillReceiveProps() {}

	componentWillUpdate() {}

	componentDidUpdate() {}

	goUrl(item, e) {
		e.stopPropagation();
		// console.log(this.props);
		let itemTrue = 0;
		this.props.history.push(item.menuUrl);

		// 选中的数组
		this.props.sideList.childs.forEach((it, ix) => {
			if (it === item) {
				itemTrue = ix;
			}
		});

		// 取消其他的Url
		this.props.sideList.childs.forEach((it, ix) => {
			it.checked = false;
			if (it.childs) {
				it.childs.forEach(iit => {
					iit.checked = false;
				});
			}
		});

		// 选中的url
		// if (itemTrue) {
		this.props.sideList.childs[itemTrue].checked = true;
		if (this.props.sideList.childs[itemTrue].childs) {
			this.props.sideList.childs[itemTrue].childs[0].checked = true;
			app.$storage.set(
				"urlHistoryTwo",
				this.props.sideList.childs[itemTrue].childs[0].menuUrl
			);
		}
		// }

		// 跳转路径
		if (this.props.sideList.childs[itemTrue].childs) {
			this.props.sideList.childs[itemTrue].childs.forEach(item => {
				if (item.checked) {
					this.props.history.push(item.menuUrl);
				}
			});
			this.props.sideList.childs[itemTrue].slide = !this.props.sideList
				.childs[itemTrue].slide;
		}

		app.$storage.set("urlHistory", item.menuUrl);
		// app.$storage.remove('urlHistoryTwo');
	}

	goTwoUrl(e, item, index) {
		e.stopPropagation();
		console.log(this.props);
		let itemIndex = "";
		this.props.history.push(item.menuUrl);
		this.props.sideList.childs.forEach((it, ix) => {
			it.checked = false;
			if (it.childs) {
				it.childs.forEach(iit => {
					itemIndex = index;
					iit.checked = false;
				});
			}
		});

		this.props.sideList.childs[itemIndex].checked = true;
		item.checked = true;
		this.setState({
			item
		});
		app.$storage.set(
			"urlHistory",
			this.props.sideList.childs[itemIndex].menuUrl
		);
		app.$storage.set("urlHistoryTwo", item.menuUrl);
	}

	render() {
		return (
			<div className={styles.asideWrap}>
				<h3>{this.props.sideList.name}</h3>
				{this.props.sideList.childs.map((item, index) => {
					return (
						<div
							key={item.id}
							onClick={e => {
								this.goUrl(item, e);
							}}
						>
							<span className={item.checked && styles.on}>
								<span className={styles.slideTit}>
									{item.name}
								</span>
								{/* {item.childs && <img className={styles.imgRight} src={item.slide ? './images/icon-down.png' : './images/icon-up.png'} />} */}
								{item.childs &&
									(item.slide ? (
										<Icon type="down" />
									) : (
										<Icon type="right" />
									))}
							</span>
							{item.childs && item.slide && (
								<div className={styles.pLi}>
									{item.childs.map((it, ix) => {
										return (
											it.hasAuth && (
												<p
													onClick={e => {
														this.goTwoUrl(
															e,
															it,
															index
														);
													}}
													key={it.id}
													className={
														it.checked && styles.on
													}
												>
													{it.name}
												</p>
											)
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	}
}

export default withRouter(BatarAside);
