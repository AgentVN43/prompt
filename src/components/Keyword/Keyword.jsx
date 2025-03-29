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
  const [genTitle, setGenTitle] = useState(null);
  const [aiTitleResponse, setAiTitleResponse] = useState(null);

  const onFinish = (values) => {
    const structuredData = {
      request: `Create a keyword set according to the information below to ensure SEO standards.`,
      result_type: "json",
      notes: "not fluff",
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

        lsi: [
          "mua bếp từ ở đâu",
          "cách chọn bếp từ tốt",
          "bếp từ có tốn điện không",
          "so sánh bếp từ và bếp hồng ngoại",
          "bếp từ dùng có an toàn không",
          "bếp từ phù hợp với gia đình nào",
          values.location ? `ưu đãi bếp từ tại ${values.location}` : "",
          values.brand ? `bếp từ ${values.brand} có tốt không` : "",
          values.brand
            ? `so sánh bếp từ ${values.brand} với thương hiệu khác`
            : "",
        ].filter(Boolean), // Xóa các giá trị rỗng nếu location hoặc brand không có
      },
    };

    setJsonData(structuredData);
  };

  const gentitle = (aiResponse) => {
    if (!aiResponse) {
      message.warning("Chưa có dữ liệu AI để tạo tiêu đề!");
      return;
    }

    const structuredData = {
      aiResponse,
      request: `Choose 5 keywords and create 5 Vietnamese titles for website posts, following title_guidelines, thinking before response`,
      result_type: "plain text, separated by commas ;",
      notes: "just vietnamese, not fluff, Do not arbitrarily add unnecessary data",
      title_guidelines: {
        use_primary_keyword_first: {
          description: "Start the title with the primary keyword.",
          example: "10 Cruise Packing Tips to Avoid Overpacking",
        },
        highlight_pain_point_or_benefit: {
          description: "Clearly highlight a problem or benefit in the title.",
          example: "How to Pack for a Cruise Without Overpacking.",
        },
        character_limit: {
          description:
            "Keep the title under 60 characters for optimal SEO display.",
          example: "5 Ways to Improve Your Photography Skills",
        },
        include_number_if_relevant: {
          description:
            "Use numbers in the title when appropriate to increase engagement.",
          example: "5 Ways to Improve Your Photography Skills",
        },
        talk_directly_to_audience: {
          description:
            "Write the title directly addressing the target audience.",
          example: "SEO Tips Every Travel Blogger Needs to Know.",
        },
        be_specific: {
          description: "Provide clear and specific information.",
          example: "How to Start a Travel Blog on WordPress in 3 Easy Steps.",
        },
        evoke_emotion_or_curiosity: {
          description: "Use words that spark emotion or curiosity.",
          example: "5 Surprising SEO Mistakes That Are Killing Your Traffic",
        },
        unique_angle: {
          description:
            "Make the title stand out by offering a unique perspective.",
          example: "10 Wedding Budget Hacks You Haven’t Heard Before",
        },
        clarity_over_cleverness: {
          description:
            "Prioritize clarity and readability over being overly clever.",
          example: "How to Bake the Perfect Sourdough Bread",
        },
        break_up_sentences: {
          description:
            "Use punctuation like colons, periods, or brackets to break up sentences for readability.",
          example: "How to Start a Blog (And Make Money While You Sleep)",
        },
        address_common_objections: {
          description:
            "Tackle common concerns or objections readers might have.",
          example: "Quick Dinner Recipes for Families With Picky Eaters",
        },
      },
    };

    setGenTitle(structuredData); // Cập nhật state để render lại AiButton
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
            {
              <AiButton
                prompts={[JSON.stringify(jsonData)]}
                onComplete={(data) => setAiResponse(data.response)}
              />
            }
          </Card>
        </Col>

        {/* Cột 3: Kết quả AI */}
        <Col span={8}>
          <Card title="🔹 Kết quả keyword từ AI">
            {aiResponse ? <pre>{aiResponse}</pre> : "Chưa có dữ liệu AI."}
          </Card>
          <Button onClick={() => gentitle(aiResponse)}>Tạo tiêu đề</Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Cột 3: Kết quả AI */}
        <Col span={8}>
          <Card title="🔹 Kết quả tiêu đề từ AI">
            {genTitle && (
              <AiButton
                prompts={[JSON.stringify(genTitle)]}
                onComplete={(data) => setAiTitleResponse(data.response)}
              />
            )}
            {aiTitleResponse ? (
              <pre>{aiTitleResponse}</pre>
            ) : (
              "Chưa có dữ liệu AI."
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
