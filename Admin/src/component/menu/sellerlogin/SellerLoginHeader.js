import React from "react";
import { Button, Descriptions, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { BASE_URL_catalog } from "../../../services/constants";

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

function SellerloginHeader() {
  const url = BASE_URL_catalog + "/images/";
  const text = 'day22owl.png'
  const localSt = JSON.parse(localStorage.getItem("token"));
  const logoutAction = () => {
    const localSt = JSON.parse(localStorage.getItem("token"));
    console.log(localSt)
    if (localSt != null) {
      localStorage.removeItem("token");
    }
    console.log(localSt)
  }
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={localSt.sellerUserName}
        subTitle={"Email: "+localSt.sellerEmail}
        extra={[
          <Button key='1'><Link href={localSt.sellerWebSite} onClick = {() => openInNewTab(localSt.sellerWebSite)}>{localSt.sellerWebSite}</Link></Button>,
          <Button key="3" onClick={()=>logoutAction()}><Link to="/home">Logout</Link></Button>,
          <Button key="2" onClick={()=>logoutAction()}><Link to="/">Enter As Admin</Link></Button>,
          <Link to="/logined"><img style={{ height: "100px", widows: "100px" }} src={url + text} /></Link>,
        ]}
      >
        {/* <Descriptions size="small" column={3}> */}
          {/* <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
          <Descriptions.Item label="Effective Time">
            2017-10-10
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item> */}
        {/* </Descriptions> */}
      </PageHeader>
    </div>
  );
}

export default SellerloginHeader;
