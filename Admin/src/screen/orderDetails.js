import React, { useState, useEffect, useForm } from 'react';
import { Table, Select, Avatar, Row, Col, Card, Divider, Typography, Input, Space, Button, } from 'antd';

import { updateOrderStatusApi } from '../services/API';
import Highlighter from 'react-highlight-words';
import { UserOutlined } from '@ant-design/icons';
const style = { background: '#0092ff', padding: '8px 0' };

const { Option } = Select;
const { Text, Link ,Paragraph} = Typography;

const OrderDetailsScreen = (props) => {
    const [orderData, setOrderData] = useState({});
    const [address, setAddress] = useState([]);
    const [status, setStatus] = useState();

    useEffect(() => {
        setOrderData(props.location.state.data);
        setAddress(props.location.state.data.address);
        setStatus(props.location.state.data.deliveryStatus)
    }, []);

   const onChange =(value)=>{ 
    let data = {};
    data.deliveryStatus = value;
    data.id = orderData.id;
    updateOrderStatusApi(data).then(data => {      
        setStatus(value)
    },
        error => {
        }
    );
   }
    return (

        <>

            <Card title={'Order Number :'+orderData.id}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Row >
                            <Col className="gutter-row">
                            <Text strong>Total Amount : {orderData.totalPrice}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="gutter-row" >
                            <Text strong> Payment status : {orderData.paymentStatus}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="gutter-row">
                            <Text strong> Total Items : {orderData.itemCount}</Text>
                            </Col>
                        </Row>
                       
                        <Row>
                            <Col className="gutter-row">
                            <Text strong> Date : {orderData.createDate}</Text>
                            </Col>
                        </Row>
                        
                    </Col>

                    <Col offset={1} span={11}>
                    <Row>
                            <Col className="gutter-row">
                            <Text strong> Mobile : {orderData.mobile}</Text>
                            </Col>
                        </Row>
                        
                                <Row >
                                    <Col className="gutter-row">
                                    <Text strong>  House No : {address.house}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row">
                                    <Text strong>  Street/Building :{address.street}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row">
                                    <Text strong> City :{address.city}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="gutter-row">
                                    <Text strong>  State : {address.state} -- Pincode : {address.pincode}</Text>
                                    </Col>
                        </Row>
                    </Col>

                </Row>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}></Divider>
                <Row justify="end"> 
                <Col className="gutter-row">
                                <Text>Status : </Text>
                                <Space></Space>
                            <Select
                                onChange={onChange}
                                style={{ width: 170 }}
                                value={status}
                            >
                                        <Option value="new">New</Option>
                                        <Option value="packing">Packing</Option>
                                        <Option value="packed">Packed</Option>
                                        <Option value="out">Out for Delivery</Option>
                                        <Option value="delivered">Delivered</Option>
                                    </Select>
                            </Col>
                </Row>

                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>

                </Divider>
                {props.location.state.data.item.map((p, index) => (

                    <Row gutter={[16, 24]}>
                         <Col className="gutter-row" span={3}>
                         <Avatar src={p.thumbnail} shape="square" size={64} icon={<UserOutlined />} />
                        </Col>
                        <Col className="gutter-row" span={3}>
                            {p.productIdentifier}
                        </Col>
                        <Col className="gutter-row" span={3}>
                            {p.brand}
                        </Col>
                        <Col className="gutter-row" span={3}>
                            {p.category}
                        </Col>
                        <Col className="gutter-row" span={3}>
                            {p.qty} - {p.weightUnit}
                        </Col>
                        <Col className="gutter-row" span={3}>
                            {p.price} Rs.
                        </Col>

                    </Row>

                ))}
                 <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>

</Divider>
            </Card>


        </>
    );


};

export default OrderDetailsScreen