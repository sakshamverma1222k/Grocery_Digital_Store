import { Form, Input, Button, Checkbox ,Divider} from 'antd';
import React, { useState, useEffect, useForm } from 'react';
import { Layout , Card,Statistic} from 'antd';
import { Row, Col } from 'antd';
import { ArrowDownOutlined,LineChartOutlined, HeatMapOutlined,BarChartOutlined,UserAddOutlined } from '@ant-design/icons';
import OrderScreen from './order';
import {getStat, getUserStat } from '../services/API';




const HomeScreen = () => {

    const [todayOrder, setTodayOrder] = useState({});
    const [todayUser, setTodayUser] = useState({});
 

    useEffect(() => {
        fetchStat();
    }, []);

    useEffect(() => {
        fetchUserStat();
    }, []);

   const fetchStat =()=>{ 
    getStat().then(data => {    
        setTodayOrder(data.data.data)
    },
        error => {
        }
    );
   }

   const fetchUserStat =()=>{ 
    getUserStat().then(data => {    
        console.log(data.data.data);  
        setTodayOrder(data.data.data)
    },
        error => {
        }
    );
   }

    return (
        <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Today's Order"
                value={todayOrder.o}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<HeatMapOutlined />}
               // suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Todays Sale"
                value={todayOrder.t}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<BarChartOutlined />}
                suffix="Rs."
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Todays New User"
                value={9.3}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<UserAddOutlined />}
                //suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Number of Items Sold"
                value={todayOrder.i}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<LineChartOutlined /> }
                //suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <OrderScreen></OrderScreen>
        
      </div>
    );
};

export default HomeScreen