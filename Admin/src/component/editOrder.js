import React, { useState, useEffect, useForm } from "react";
import {
  Table,
  Breadcrumb,
  Modal,
  Popconfirm,
  Row,
  Col,
  Divider,
  Spin,
  Input,
  Space,
  Button,
} from "antd";
import { catalog, getOrderApi, catalogDelete } from "../services/API";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  CheckCircleTwoTone,
  WarningTwoTone,
  ZoomInOutlined,
  ContactsTwoTone,
} from "@ant-design/icons";
const style = { background: "#0092ff", padding: "8px 0" };

const EditOrderScreen = (props) => {
  const [finalData, setFinalData] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    //setFinalDaa(props.data);
    console.log(data);
  }, []);

  return (
    <>
      <div>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        ></Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            Total Amount : {props.totalPrice}
          </Col>
          <Col className="gutter-row" span={6}>
            Total Items : {props.data.itemCount}
          </Col>
          <Col className="gutter-row" span={6}>
            Mobile : {props.data.mobile}
          </Col>
          <Col className="gutter-row" span={6}>
            Payment status : {props.data.paymentStatus}
          </Col>
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Address
        </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            House No : {props.data.address.house}
          </Col>
          <Col className="gutter-row" span={6}>
            Street/Building :{props.data.address.street}
          </Col>
          <Col className="gutter-row" span={6}>
            City :{props.data.address.city}
          </Col>
          <Col className="gutter-row" span={6}>
            State : {props.data.address.state} -- Pincode :{" "}
            {props.data.address.pincode}
          </Col>
        </Row>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Items
        </Divider>
        {props.data.item.map((p, index) => (
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              {p.productIdentifier}
            </Col>
            <Col className="gutter-row" span={6}>
              {p.productIdentifier}
            </Col>
            <Col className="gutter-row" span={6}>
              {p.qty} - {p.weightUnit}
            </Col>
            <Col className="gutter-row" span={6}>
              {p.price}
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default EditOrderScreen;
