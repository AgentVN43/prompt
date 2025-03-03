import React, { useState } from "react";
import {
  Row,
  Col,
  Select,
  Input,
  Typography,
  Layout,
  message,
  Button,
} from "antd";
import { Descriptions } from "antd";
import actionJson from "../../constants/content/action.json";
import languageJson from "../../constants/langause.json";
import toneJson from "../../constants/content/tone.json";
import outlineJson from "../../constants/content/outline.json";
import modelJson from "../../constants/content/model.json";
import contentJson from "../../constants/content/contenttype.json";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const { Title, Paragraph } = Typography;
const { Content } = Layout;

const items = [
  {
    key: "1",
    label: "Chất lượng",
    content:
      "Vật liệu hoặc thành phần cao cấp, tay nghề thủ công cao cấp, phương pháp sản xuất độc quyền, độc nhất vô nhị",
  },
  {
    key: "2",
    label: "Giá",
    content:
      "Giá thấp nhất được đảm bảo, giá cả phù hợp, miễn phí vận chuyển, giảm giá khi mua số lượng lớn, ưu đãi đặc biệt",
  },
  {
    key: "3",
    label: "Dịch vụ",
    content:
      "Trả hàng dễ dàng, cá nhân hóa, dịch vụ khách hàng tuyệt vời hoặc thậm chí là tư vấn và lựa chọn sản phẩm và hàng hóa được tuyển chọn kỹ lưỡng",
  },
];

export default function CreateContent() {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedOutline, setSelectedOutline] = useState("");
  const [selectModel, setSelectedModel] = useState("");
  const [selectContentType, setContentType] = useState("");

  const [product, setProduct] = useState("");
  const [keyword, setKeyword] = useState("");
  const [usp, setUSP] = useState("");

  const combineSelections = () => {
    return {
      expertise: "You are an expert in content marketing.",
      action: selectedAction,
      language: selectedLanguage,
      product: product,
      keyword: keyword,
      structure: {
        goal: selectedTone,
        outline: selectedOutline,
        mainTitle: {
          instruction: `Start with '${keyword}', title length should not exceed 60 characters, and capitalize the first letter of each word.`,
        },
        content: selectModel,
        conclusion:
          "Summarize key takeaways and include a call to action for user engagement.",
        seoOptimization: {
          keywords: [keyword], // Simplified keyword usage
          metaDescription: `This is the content that will appear as the description when this article shows up in search results. Start with '${keyword}', meta description length should not exceed 160 characters. `,
        },
      },
      paragraphRules:
        "Each paragraph should be 2 to 3 sentences long for readability.",
      languageRules:
        "Use simple, direct language with a conversational tone. Maintain clarity and avoid jargon.",
      outputFormat:
        "HTML format with proper semantic tags (e.g., h1, h2, h3, p). Start with <div> tag and avoid including headers, titles, or irrelevant content.",
    };
  };

  const handleCopy = () => {
    const textToCopy = JSON.stringify(combineSelections(), null, 2); // Convert object to a readable JSON string

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch(() => {
        message.error("Failed to copy!");
      });
  };

  return (
    <>
      <Layout
        style={{ display: "flex", justifyContent: "center", padding: "0 2.5%" }}
      >
        <Content style={{ maxWidth: "100%" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Title level={4}>Select Options</Title>
              <Select
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Select Action"
                onChange={(value) => setSelectedAction(value)}
              >
                {Object.entries(actionJson).map(([key, action]) => (
                  <Option key={key} value={action}>
                    {action}
                  </Option>
                ))}
              </Select>
              <Select
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Select Language"
                onChange={(value) => setSelectedLanguage(value)}
              >
                {Object.entries(languageJson).map(([key, language]) => (
                  <Option key={key} value={language}>
                    {language}
                  </Option>
                ))}
              </Select>
              <Select
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Select Tone"
                onChange={(value) => setSelectedTone(value)}
              >
                {Object.entries(toneJson).map(([key, tone]) => (
                  <Option key={key} value={tone}>
                    {tone}
                  </Option>
                ))}
              </Select>
              <Select
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Select Outline"
                onChange={(value) => setSelectedOutline(value)}
              >
                {Object.entries(outlineJson).map(([key, outline]) => (
                  <Option key={key} value={outline}>
                    {outline}
                  </Option>
                ))}
              </Select>
              <Select
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Select Model"
                onChange={(value) => setSelectedModel(value)}
              >
                {Object.entries(modelJson).map(([key, model]) => (
                  <Option key={key} value={model}>
                    {model}
                  </Option>
                ))}
              </Select>
              {/* 
              <Select
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Select Content Type"
                onChange={(value) => setContentType(value)}
              >
                {contentJson.map((model, index) => (
                  <Option key={index} value={model.contentTypes}>
                    {model.contentTypes}
                  </Option>
                ))}
              </Select> */}

              <Title level={4}>Enter Details</Title>
              <Input
                style={{ marginBottom: 16 }}
                placeholder="Enter Product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
              <Input
                style={{ marginBottom: 16 }}
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Title level={4}>Product Details</Title>
              <Descriptions title="Xác định USP" bordered column={1}>
                {items.map((item) => (
                  <Descriptions.Item key={item.key} label={item.label}>
                    {item.content}
                  </Descriptions.Item>
                ))}
              </Descriptions>

              <TextArea
                value={usp}
                style={{ marginBottom: 16 }}
                onChange={(e) => setUSP(e.target.value)}
                placeholder="Enter USP"
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />
            </Col>
            <Col span={6}>
              <Title level={4}>Your Selection:</Title>
              <Paragraph>
                {JSON.stringify(combineSelections(), null, 2)}
              </Paragraph>
              <Button
                type="primary"
                onClick={handleCopy}
                style={{ marginBottom: "16px" }}
              >
                Copy to Clipboard
              </Button>
            </Col>
            <Col span={8}>
              <Title level={4}>Select Options</Title>
              <Paragraph>
                {JSON.stringify(combineSelections(), null, 2)}
              </Paragraph>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
