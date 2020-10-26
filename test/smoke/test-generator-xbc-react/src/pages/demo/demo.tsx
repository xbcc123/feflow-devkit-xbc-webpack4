import React, { Component } from 'react'
import { Row, Col, Card, Input, Button, Form, InputNumber } from 'antd'
import { withRouter } from 'react-router-dom'
// import s from './demo.scss'
import moment from 'moment'
import app from '@/global'

export interface HelloProps {
    compiler: string
    framework: string
}

class DataManna extends Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
			a: 1
		}
    }

    componentDidMount() {
        this.getInitData()
        // this.showModalSupModal()
    }
    getInitData() {
        const { current } = this.state
        // this.getCol()
        // this.getData(current)
    }

    // 获取数据 TODO:
    getData(num) {
        const { searchParams, otherRate, pageSize: rows } = this.state
        const params = {
            page: num,
            rows
        }
        this.setState({
            tableLoading: true
        })
        Object.assign(params, searchParams, this.state.searchParams)
        return app.$api.diamondList(params).then(res => {
            // console.log(res);
            this.setState({
                tableLoading: false
            })
            if (!res.data.data.data) {
                res.data.data.data = []
            }
            if (res.data.data) {
                res.data.data.data.forEach(item => {
                    // item.chinaPrice = parseFloat(
                    // 	item.price * otherRate
                    // ).toFixed(2);
                    item.updatetime = moment(item.updatetime).format('YYYY-MM-DD')
                })
            }
            // console.log(res.data)
            this.setState({ current: num, result: res.data.data })
        })
    }

    goDetail(options) {
        console.log(options)
        const data = {
            way: options
        }
        const path = {
            pathname: '/app/dataManaPrice/dataManaPrice',
            state: data
        }
        this.props.history.push(path)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <div className={`content`}>
                <Card title="费用维护" bordered={false}>
                    <Row>
                        <Col span={1}>保险费</Col>
                        <Col span={1} offset={1}>
                            <Input ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} offset={20}>
                            <Button>取消</Button>
                        </Col>
                        <Col span={1} offset={1}>
                            <Button type="primary">确定</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

const DataMannaForm = Form.create()(DataManna)

export default withRouter(DataMannaForm)
