import React from "react";
import * as Mui from "@material-ui/core";

export default class Button extends React.Component {
	forceSpace() {
		return
	}

	render() {
		return (
			<Mui.Button variant="contained" disabled={this.props.disabled} onClick={this.props.onClick}>
				{this.props.disabled ? "\u00a0" : this.props.children}
			</Mui.Button>
		);
	}
}
