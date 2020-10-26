import React from "react";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Switch } from 'antd';
import { Button } from 'antd';

// import s from "./index.scss";

class Index extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {};
	}

	render() {
		return (
			< >
				<section className="ml30 pt30">
					<h1 className="f30">Hello World!!!</h1>
					<h1 className="f20 c9 mt10">项目类型: React</h1>
					<h1 className="f20 c9 mt10">应用场景: 后台管理</h1>
					<h1 className="f20 c9 mt10">UI框架: ant4</h1>
					<h1 className="f20 c9 mt10">状态管理: mobx</h1>
				</section>
			</>
		);
	}
}

export default withRouter(Index);
