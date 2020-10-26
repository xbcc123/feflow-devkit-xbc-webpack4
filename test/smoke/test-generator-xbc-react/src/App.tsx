import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { asyncComponent as async } from "@/route/asyncComponent";
// import { renderRoutes } from "react-router-config";
import renderRoutes from "./utils/renderRoutes";
 
// 钻石信息
import routes from "./route/index";

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Redirect from="/" to="/app/index" exact />
					{renderRoutes(routes.routes)}
				</Switch>
			</HashRouter>
		);
	}
}

export default App;
