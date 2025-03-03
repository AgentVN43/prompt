import React, { useState } from "react";
import { Menu, Layout, Typography } from "antd";
import CreateContent from "../../components/CreateContent/Content";
import MultipleOpen from "../../components/MultipleOpen";
import DigitalMarketing from "../../components/Business/DigitalMarketing";

const { Header, Content } = Layout;

const menuItems = [
  { key: "1", label: "Create Content for SEO", component: <CreateContent /> },
  { key: "2", label: "Multiple Open Tabs", component: <MultipleOpen /> },
  { key: "3", label: "Digital Marketing", component: <DigitalMarketing /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ backgroundColor: "#001529", padding: 0 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
        >
          {menuItems.map(({ key, label }) => (
            <Menu.Item key={key}>{label}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: "24px" }}>
        {menuItems.find((item) => item.key === activeTab)?.component}
      </Content>
    </Layout>
  );
}
