import React, { useState } from "react";
import { Menu, Layout, Typography } from "antd";
import CreateContent from "../../components/CreateContent/Content";
import MultipleOpen from "../../components/MultipleOpen";
import DigitalMarketing from "../../components/Business/DigitalMarketing";
import RankMath from "../../components/rankmath";
import Aigentext from "../../components/Aigentext/Aigentext";
import SEOchecker from "../../components/SEOchecker/SEOchecker";
import TitleGenerator from "../../components/CreateTitle";
import Keyword from "../../components/Keyword/Keyword";

const { Header, Content } = Layout;

const menuItems = [
  { key: "1", label: "Create Content for SEO", component: <CreateContent /> },
  { key: "2", label: "Multiple Open Tabs", component: <MultipleOpen /> },
  { key: "3", label: "Digital Marketing", component: <DigitalMarketing /> },
  { key: "4", label: "Cotent Wordpress", component: <RankMath /> },
  { key: "5", label: "Content AI", component: <Aigentext /> },
  { key: "6", label: "Check SEO", component: <SEOchecker /> },
  { key: "7", label: "Create", component: <TitleGenerator /> },
  { key: "8", label: "Keyword", component: <Keyword /> },
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
