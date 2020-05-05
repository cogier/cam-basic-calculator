import React from "react";

import Row from "./components/Row";
import Display from "./components/Display";
import Button from "./components/Button";
import { ButtonBase } from "@material-ui/core";

export default class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			xNum: "",
			yNum: "",
			operator: null,
			xIsDisplayed: true,
		};
	}

	handleClearClick() {
		this.setState({
			xNum: "",
			yNum: "",
			operator: null,
			xIsDisplayed: true,
		});
	}

	handleBackspaceClick() {
		if(this.state.xIsDisplayed && this.state.xNum !== "") {
			this.setState({
				xNum: this.state.xNum.slice(0, this.state.xNum.length - 1),
			});
		}
		else if(!this.state.xIsDisplayed && this.state.yNum !== "") {
			this.setState({
				yNum: this.state.yNum.slice(0, this.state.yNum.length - 1),
			});
		}
	}

	handleNumClick(i) {
		if(this.state.operator == null) {
			this.setState({
				xNum: this.state.xNum + i,
			});
		}
		else {
			if(this.state.yNum === ""){
				this.setState({
					yNum: this.state.yNum + i,
					xIsDisplayed: false,
				});
			}
			else this.setState({
				yNum: this.state.yNum + i,
			});
		};
	}

	handleOpClick(op) {
		if(this.state.xNum !== "" && this.state.xNum !== "-" && this.state.yNum === ""){
			this.setState({
				operator: op,
			});
		}
	}

	handleNegateClick() {
		if(this.state.operator == null) {
			if(this.state.xNum.charAt(0) == '-') {
				this.setState({
					xNum: this.state.xNum.slice(1, this.state.xNum.length),
				});
			}
			else{
				this.setState({
				xNum: '-' + this.state.xNum,
				});
			}
		}
		else {
			if(this.state.yNum.charAt(0) == '-') {
				this.setState({
					yNum: this.state.yNum.slice(1, this.state.yNum.length),
				});
			}
			else if(this.state.yNum === ""){
				this.setState({
					yNum: '-' + this.state.yNum,
					xIsDisplayed: false,
				});
			}
			else {
				this.setState({
					yNum: '-' + this.state.yNum,
				});
			}
		}
	}

	handleDecimalClick() {
		if(this.state.operator == null && (this.state.xNum.indexOf('.') == -1)) {
			if(this.state.xNum === ""){
				this.setState({
					xNum: "0.",
				});
			}
			else this.setState({
				xNum: this.state.xNum + '.',
			});
		}
		else if(this.state.operator != null && (this.state.yNum.indexOf('.') == -1)) {
			if(this.state.yNum === ""){
				this.setState({
					yNum: "0.",
					xIsDisplayed: false,
				});
			}
			else {
				this.setState({
					yNum: this.state.yNum + '.',
				});
			}
		}
	}

	handleEqualsClick() {
		if(this.state.yNum !== "" && this.state.yNum !== "-") {
			switch(this.state.operator) {
				case '+':
					this.setState({
						xNum: (parseFloat(this.state.xNum) + parseFloat(this.state.yNum)).toString(),
						yNum: "",
						operator: null,
						xIsDisplayed: true,
					});
					break;
				case '-':
					this.setState({
						xNum: (parseFloat(this.state.xNum) - parseFloat(this.state.yNum)).toString(),
						yNum: "",
						operator: null,
						xIsDisplayed: true,
					});
					break;
				case '×':
					this.setState({
						xNum: (parseFloat(this.state.xNum) * parseFloat(this.state.yNum)).toString(),
						yNum: "",
						operator: null,
						xIsDisplayed: true,
					})
					break;
				case '÷':
					this.setState({
						xNum: (parseFloat(this.state.xNum) / parseFloat(this.state.yNum)).toString(),
						yNum: "",
						operator: null,
						xIsDisplayed: true,
					})
					break;
				default:
					break;
			}
		}
	}

	renderClearKey() {
		return (
			<Button onClick={() => this.handleClearClick()}>
				{"Clear"}
			</Button>
		);
	}

	renderBackspaceKey() {
		return(
			<Button onClick={() => this.handleBackspaceClick()}>
				{'←'}
			</Button>
		);
	}

	renderNumKey(i) {
		return (
			<Button onClick={() => this.handleNumClick(i)}>
				{i}
			</Button>
		);
	}

	renderOpKey(op) {
		return (
			<Button onClick={() => this.handleOpClick(op)}>
				{op}
			</Button>
		);
	}

	renderNegateKey() {
		return (
			<Button onClick={() => this.handleNegateClick()}>
				{"+/-"}
			</Button>
		);
	}

	renderDecimalKey() {
		return (
			<Button onClick={() => this.handleDecimalClick()}>
				{'.'}
			</Button>
		);
	}

	renderEqualsKey() {
		return (
			<Button onClick={() => this.handleEqualsClick()}>
				{'='}
			</Button>
		);
	}

	render() {
		const displayNum = (this.state.xIsDisplayed ? this.state.xNum : this.state.yNum);
		return (
			<div className="calc">
				<Row>
					<Display value={displayNum}/>
				</Row>
				<Row>
					{this.renderClearKey()}
					{this.renderBackspaceKey()}
					<Button disabled={true}/>
					{this.renderOpKey('+')}
				</Row>
				<Row>
					{this.renderNumKey(7)}
					{this.renderNumKey(8)}
					{this.renderNumKey(9)}
					{this.renderOpKey('-')}
				</Row>
				<Row>
					{this.renderNumKey(4)}
					{this.renderNumKey(5)}
					{this.renderNumKey(6)}
					{this.renderOpKey('×')}
				</Row>
				<Row>
					{this.renderNumKey(1)}
					{this.renderNumKey(2)}
					{this.renderNumKey(3)}
					{this.renderOpKey('÷')}
				</Row>
				<Row>
					{this.renderNumKey(0)}
					{this.renderNegateKey()}
					{this.renderDecimalKey()}
					{this.renderEqualsKey()}
				</Row>
			</div>
		);
	}
}
