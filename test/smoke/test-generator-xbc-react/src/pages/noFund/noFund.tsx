import * as React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router-dom";

export interface HelloProps {
	compiler: string;
	framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component {
	goHome() {
		this.props.history.push("/");
	}

	render() {
		return (
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button type="primary" onClick={this.goHome.bind(this)}>
						Back Home
					</Button>
				}
			/>
		);
	}
}

export default withRouter(Hello);
