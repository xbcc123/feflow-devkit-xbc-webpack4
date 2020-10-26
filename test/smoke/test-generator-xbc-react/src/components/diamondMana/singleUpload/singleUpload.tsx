import React, { Component } from 'react';
import { Layout, Row, Col, Card, Select, Input, Button, Radio, InputNumber, Form, message } from 'antd';
import './singleUpload.scss';
import app from '@/app';

const Option = Select.Option;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Header, Footer, Sider, Content } = Layout;
import diamondObj from '@/utils/diamond.js';

// 定义接口数据
interface IProps {
	color: string;
	size?: string;
	form: any;
}

interface IParams {
	id: number;
	code: string;
	shape: string;
	carat: string;
	color: string;
	clarity: string;
	cut: string;
	polish: string;
	symmetry: string;
	fluor: string;
	depth: string;
	tableper: string;
	lab: string;
	certno: string;
	m1: number;
	m2: number;
	m3: number;
	rapprice: number;
	price: string;
	priceType: string;
	back: string;
	ha: string;
	milk: string;
	brown: string;
	green: string;
	location: string;
	source: string;
	comment: string;
	status: number;
	updatetime: string;
	userId: number;
	userName: string;
}

interface IResult {
	rowSize: number;
	data: object;
}
interface IState {
	list: object;
	confirmLoading: boolean;
	params: IParams;
	diamondObj: object;
	diamondProperty: object;
}

class SingleUpload extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
			list: [],
			params: {},
			diamondObj,
			diamondProperty: {
				shape: '形状',
				color: 'D',
				clarity: 'FL',
				cut: 'EX',
				polish: 'EX',
				symmetry: 'EX',
				fluor: 'N'
			}
		};
	}

	componentDidMount() {
		// this.getList();
	}

	componentWillReceiveProps(nextProps) {
		const {} = this.state;
		if ('diamondProperty' in nextProps) {
			this.setState({
				diamondProperty: nextProps.diamondProperty
			});
		}
		// if ("userId" in nextProps) {
		// 	this.setState({
		// 		userId: nextProps.userId
		// 	});
		// }
	}

	// 重置
	handleReset() {
		this.props.form.resetFields();
	}

	valiData(options) {
		const { carat } = options;
		if (!carat) {
			message.error(`请输入正确的重量`);
			return false;
		}
		return true;
	}

	// 确定
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log("Received values of form: ", values);
				this.addList(values);
			}
		});
	}

	// addList
	addList(values) {
		if (!this.valiData(values)) {
			return;
		}
		this.setState({
			confirmLoading: true
		});
		app.$api
			.diamondUpDiamond(values)
			.then((res) => {
				message.success('钻石信息上传成功');
			})
			.finally(() => {
				this.setState({
					confirmLoading: false
				});
			});
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
			colon: false
		};

		const { getFieldDecorator } = this.props.form;

		const { diamondObj, diamondProperty, confirmLoading, list } = this.state;
		const { form } = this.props;

		return (
			<div id="hotParameter">
				<div className="tit-tag" />
				<Card style={{ width: `100%` }}>
					<div className="fb">
						<section>
							<Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
								<div className="fw form-item">
									<Col span={4}>
										<FormItem label="货号" {...formItemLayout}>
											{getFieldDecorator('code', {})(
												<Input placeholder="请输入货号" style={{ width: 120 }} />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="形状" {...formItemLayout}>
											{getFieldDecorator('shape', {
												rules: [
													{
														required: true,
														message: '请选择形状'
													}
												]
											})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择形状">
													{diamondObj.shape.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="重量ct" {...formItemLayout}>
											{getFieldDecorator('carat', {
												rules: [
													{
														required: true,
														message: '请输入重量'
													}
												]
											})(<InputNumber min={0} style={{ width: 120 }} placeholder="请输入重量" />)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="颜色" {...formItemLayout}>
											{getFieldDecorator('color', {
												rules: [
													{
														required: true,
														message: '请输入颜色'
													}
												]
											})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择颜色">
													{diamondObj.color.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="净度" {...formItemLayout}>
											{getFieldDecorator('clarity', {
												rules: [
													{
														required: true,
														message: '请选择净度'
													}
												]
											})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择净度">
													{diamondObj.clarity.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="切工" {...formItemLayout}>
											{getFieldDecorator('cut', {})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择切工">
													{diamondObj.cut.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="抛光" {...formItemLayout}>
											{getFieldDecorator('polish', {})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择抛光">
													{diamondObj.polish.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="对称" {...formItemLayout} style={{ paddingLeft: 5 }}>
											{getFieldDecorator('symmetry', {})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择对称">
													{diamondObj.sym.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="荧光" {...formItemLayout} style={{ paddingLeft: 10 }}>
											{getFieldDecorator('fluor', {})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择荧光">
													{diamondObj.flour.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="奶色" {...formItemLayout} style={{ paddingLeft: 5 }}>
											{getFieldDecorator('milk', {})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择奶色">
													{diamondObj.milk.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="咖色" {...formItemLayout} style={{ paddingLeft: 5 }}>
											{getFieldDecorator('brown', {})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择咖色">
													{diamondObj.brown.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="绿色" {...formItemLayout}>
											{getFieldDecorator('green')(
												<Select style={{ width: 120 }} allowClear placeholder="请选择绿色">
													{diamondObj.green.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="黑点" {...formItemLayout}>
											{getFieldDecorator('black')(
												<Select style={{ width: 120 }} allowClear placeholder="请选择黑点">
													{diamondObj.black.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="全深比" {...formItemLayout}>
											{getFieldDecorator('depth')(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入全深比" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="台宽比" {...formItemLayout} style={{ paddingLeft: 5 }}>
											{getFieldDecorator('tablePer')(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入台宽比" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="长" {...formItemLayout} style={{ paddingLeft: 10 }}>
											{getFieldDecorator('m1')(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入长" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="宽" {...formItemLayout} style={{ paddingLeft: 10 }}>
											{getFieldDecorator('m2')(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入宽" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="高" {...formItemLayout} style={{ paddingLeft: 5 }}>
											{getFieldDecorator('m3')(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入高" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="腰棱" {...formItemLayout}>
											{getFieldDecorator('girdle')(
												<Select style={{ width: 120 }} allowClear placeholder="请选择腰棱">
													{diamondObj.girdle.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="腰号" {...formItemLayout} style={{ paddingLeft: 5 }}>
											{getFieldDecorator('waistNum')(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入重量" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="底尖" {...formItemLayout} style={{ paddingLeft: 10 }}>
											{getFieldDecorator('bottomTip')(
												<Select style={{ width: 120 }} allowClear placeholder="请选择底尖">
													{diamondObj.bottomTip.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
								</div>
								<div className="hr mt20 mb40" />
								<div className="fw form-item">
									<Col span={4}>
										<FormItem label="证书机构" {...formItemLayout}>
											{getFieldDecorator('lab', {
												rules: [
													{
														required: true,
														message: '请选择证书机构'
													}
												],
												initialValue: diamondProperty.lab
											})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择证书机构">
													{diamondObj.cert.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="证书号" {...formItemLayout}>
											{getFieldDecorator('certno', {
												rules: [
													{
														required: true,
														message: '请输入证书号'
													}
												]
											})(<Input style={{ width: 120 }} placeholder="请输入证书号" />)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="产地" {...formItemLayout} style={{ paddingLeft: 6 }}>
											{getFieldDecorator('source', {
												initialValue: diamondProperty.source
											})(<Input placeholder="请输入产地" style={{ width: 120 }} />)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="所在地" {...formItemLayout}>
											{getFieldDecorator('location', {
												rules: [
													{
														required: true,
														message: '请输入所在地'
													}
												]
											})(<Input placeholder="请输入所在地" style={{ width: 120 }} />)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="是否现货" {...formItemLayout}>
											{getFieldDecorator('isCash', {
												initialValue: ``
											})(
												<Select style={{ width: 120 }}>
													<Option value="">全部</Option>
													<Option value="是">是</Option>
													<Option value="否">否</Option>
												</Select>
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="国际报价" {...formItemLayout}>
											{getFieldDecorator('rapprice', {})(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入重量" />
											)}
										</FormItem>
									</Col>

									<Col span={4}>
										<FormItem label="货币类型" {...formItemLayout}>
											{getFieldDecorator('priceType', {
												rules: [
													{
														required: true,
														message: '请选择货币类型'
													}
												],
												initialValue: `1`
											})(
												<Select style={{ width: 120 }} allowClear placeholder="请选择货币类型">
													{diamondObj.priceType.value.map((item) => {
														return (
															<Option key={item.value} value={item.value}>
																{item.label}
															</Option>
														);
													})}
												</Select>
											)}
										</FormItem>
									</Col>

									<Col span={4}>
										<FormItem label="扣点" {...formItemLayout} style={{ paddingLeft: 10 }}>
											{getFieldDecorator('back', {})(
												<InputNumber min={0} style={{ width: 120 }} placeholder="请输入重量" />
											)}
										</FormItem>
									</Col>
									<Col span={4}>
										<FormItem label="价格" {...formItemLayout}>
											{getFieldDecorator('price', {
												rules: [
													{
														required: true,
														message: '请输入价格'
													}
												]
											})(<InputNumber min={0} style={{ width: 120 }} placeholder="请输入价格" />)}
										</FormItem>
									</Col>
								</div>
								<div className="hr mt20 mb40" />
								<div className="fc">
									<div>
										<Button onClick={this.handleReset.bind(this)}>清除参数</Button>
										<Button
											className="ml20"
											type="primary"
											loading={confirmLoading}
											htmlType="submit"
										>
											提交上传
										</Button>
									</div>
								</div>
							</Form>
						</section>
					</div>
				</Card>
			</div>
		);
	}
}
const SingleUploadFrom = Form.create()(SingleUpload);

export default SingleUploadFrom;
