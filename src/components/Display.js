import React from "react";
import * as Mui from "@material-ui/core";

export default class Display extends React.Component {
	render() {
		return (
			<Mui.TextField id="outlined-basic" variant="outlined" disabled={true} value={this.props.value}/>
		);
	}
}
