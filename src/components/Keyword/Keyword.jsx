import React, { useState } from "react";
import { Form, Input, Button, Layout, Card, message, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import AiButton from "../AiButton/AiButton";

const { Sider, Content } = Layout;

export default function Keyword() {
  const [form] = Form.useForm();
  const [jsonData, setJsonData] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  const onFinish = (values) => {
    const structuredData = {
      request: `Create a keyword set according to the information below to ensure SEO standards.`,
      result_type: "json",
      website: {
        name: values.websiteName,
        url: values.websiteUrl,
        location: values.location,
      },

      products: values.products.split(",").map((p) => p.trim()),

      brand: values.brand,

      target_audience: values.targetAudience.split(",").map((p) => p.trim()),

      seo_keywords: {
        general: [
          "bếp từ nhập khẩu",
          "bếp từ giá rẻ",
          "bếp từ cao cấp",
          "bếp từ âm",
          "bếp điện từ",
        ],

        location_based: values.location
          ? [
              `bếp từ ${values.location}`,
              `mua bếp từ tại ${values.location}`,
              `bếp từ giá tốt ở ${values.location}`,
            ]
          : [],

        brand_based: values.brand
          ? [
              `bếp từ ${values.brand}`,
              `bếp từ ${values.brand} chính hãng`,
              `bếp từ ${values.brand} giá rẻ`,
            ]
          : [],

        long_tail: values.products
          ? values.products
              .split(",")
              .map(
                (product) =>
                  `mua ${product.trim()} chất lượng cao tại ${values.location}`
              )
          : [],
      },
    };

    setJsonData(structuredData);
  };

  //   const saveToFile = (data) => {
  //     const blob = new Blob([JSON.stringify(data, null, 2)], {
  //       type: "application/json",
  //     });
  //     saveAs(blob, "project.json");
  //     message.success("Dữ liệu đã được lưu vào project.json");
  //   };

  return (
    <Layout style={{ height: "100vh", padding: "20px" }}>
      {/* Dòng 1: Form nhập dữ liệu */}
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Form.Item
                name="websiteName"
                label="Tên Website"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="websiteUrl"
                label="URL Website"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="location"
                label="Vị trí"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="products"
                label="Sản phẩm"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="targetAudience"
                label="Khách hàng mục tiêu"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Lưu Dữ Liệu
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Dòng 2: JSON Preview (Left) và AI Response (Right) */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Cột 2: JSON Preview */}
        <Col span={16}>
          <Card title="Xem trước JSON">
            {jsonData ? (
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            ) : (
              "Nhập dữ liệu để xem trước JSON"
            )}
              {(
              <AiButton
                prompts={[JSON.stringify(jsonData)]}
                onComplete={(data) => setAiResponse(data.response)}
              />
            )}
          </Card>
        </Col>

        {/* Cột 3: Kết quả AI */}
        <Col span={8}>
          <Card title="🔹 Kết quả từ AI">
            {aiResponse ? <pre>{aiResponse}</pre> : "Chưa có dữ liệu AI."}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
