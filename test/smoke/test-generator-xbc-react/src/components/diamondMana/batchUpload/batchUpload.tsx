import React, { Component } from "react";
import { Upload, Button, Icon, message, Card, Radio } from "antd";
import app from "@/app";
import s from "./batchUpload.scss";
import { runInThisContext } from "vm";

interface IProps {
	color: string;
	size?: string;
}

interface IParams {
	currency: number;
	address: string;
}

interface IState {
	uploading: boolean;
	fileList: object;
	params: IParams;
}

class BatchUpload extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			fileList: [],
			uploading: false,
			params: {
				currency: 2,
				address: `货在国外`
			}
		};
	}

	handleUpload() {
		this.setState({
			uploading: true
		});
		const {
			fileList,
			params: { currency, address }
		} = this.state;
		const formData = new FormData();
		// fileList.forEach((file) => {
		//     formData.append('files[]', file);
		// });
		// console.log(fileList[0]);

		formData.append("excelFile", fileList[0]);
		// formData.append("currency", currency);
		// formData.append("address", address);
		// message.error('upload failed.');
		app.$api
			.diamondUpDiamondExcel(formData)
			.then(res => {})
			.finally(res => {
				// console.log(111);
				this.setState({
					uploading: false
				});
			});
	}

	// 获取货币类型
	getCurrency(e) {
		this.state.params.currency = e.target.value;
		this.setState({
			params: this.state.params
		});
	}

	// 获取货源类型
	getSourceType(e) {
		this.state.params.address = e.target.value;
		this.setState({
			params: this.state.params
		});
	}

	render() {
		const { uploading, fileList } = this.state;
		const props = {
			onRemove: file => {
				this.setState(state => {
					const index = state.fileList.indexOf(file);
					const newFileList = state.fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList
					};
				});
			},
			beforeUpload: file => {
				this.setState(state => ({
					fileList: [...state.fileList, file]
				}));
				return false;
			},
			fileList
		};

		return (
			<div>
				<Card>
					<div className="mt20 mb40">
						钻石数据,一件上传。请将您的钻石数据Excel/cvs文件直接上传,
						您不需要调整数据格式。
						上船前请确认文件内的钻石信息学的完整性以及准确性！
					</div>

					<div className="fs">
						<Upload {...props}>
							<Button>
								<Icon type="upload" /> 请选择Excel/cvs文件
							</Button>
						</Upload>
						<div className="fs f10 c9 mr20 ml20">
							请将上传的文件大小控制在20M以内
						</div>
						<div className="fs cd f10">
							<a
								href="/static/doc/钻石批量上传模板.xls"
								className="cd"
							>
								下载上传模板
							</a>
						</div>
					</div>

					<div className="mt20 mb40"> </div>

					<div className={s.radioCurrency}>
						<div>
							货币类型：
							<span className="c9">
								(您上传的钻石数据中，如果价格选择的是美元，平台将按照既定汇率换算成人民币)
							</span>
						</div>
						{/* <div>
							<Radio.Group
								name="radiogroup"
								defaultValue={2}
								onChange={this.getCurrency.bind(this)}
							>
								<Radio value={2}>人民币</Radio>
								<Radio value={1}>
									<span>美元</span>
									<span className="c9">
										(您上传的钻石数据中，如果价格选择的是美元，平台将按照既定汇率换算成人民币)
									</span>
								</Radio>
							</Radio.Group>
						</div> */}
					</div>

					{/* <div className={s.radioSource}>
						<div>货源类型：</div>
						<div>
							<Radio.Group
								name="radiogroup"
								defaultValue={1}
								onChange={this.getSourceType.bind(this)}
							>
								<Radio value={`国内现货`}>国内现货</Radio>
								<Radio value={`货在境外`}>货在境外</Radio>
							</Radio.Group>
						</div>
					</div> */}

					<div className="mt20 mb40"> </div>
					<div className="fb">
						<div></div>
						<Button
							className={s.upBtn}
							type="primary"
							onClick={this.handleUpload.bind(this)}
							disabled={fileList.length === 0}
							loading={uploading}
							style={{ marginTop: 16 }}
						>
							{uploading ? "上传中" : "确认上传"}
						</Button>
					</div>
				</Card>
			</div>
		);
	}
}

export default BatchUpload;
