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
import actionJson from "./constants/action.json";
import languageJson from "./constants/langause.json";
import toneJson from "./constants/tone.json";
import outlineJson from "./constants/outline.json";
import modelJson from "./constants/model.json";
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

export default function Prompt({name, keywords, description}) {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedOutline, setSelectedOutline] = useState("");
  const [selectModel, setSelectedModel] = useState("");

  const [product, setProduct] = useState("");
  const [keyword, setKeyword] = useState("");
  const [usp, setUSP] = useState("");

  const combineSelections = () => {
    return `You are an expert in contet marketing. 
${selectedAction} SEO content for the web using in ${selectedLanguage} with 
a Product: "${name}" Keyword: "${keywords}" About: "${description}".
Complete sections according to the following structure and standards: 
1. Goal: ${selectedTone}  
2. Outline: ${selectedOutline} 
3. Main title (title): main keyword at the beginning of the title, title length must not exceed 60 characters and capitalize all first 
letters of words 
4. Content: ${selectModel}.
5. Conclusion: summarize what was mentioned in the article, add a call to action.
6. Make sure each paragraph is a maximum of 2 to 3 sentences long.
7. Use direct, simple language and choose phrases that are commonly used in everyday speech. 
If a formal phrase is absolutely necessary for clarity or accuracy, you may include it, but otherwise, please prioritize
making the text engaging, clear, and relatable.
8. Please give the result in html format using h1, h2, h3, p correctly (begin with div not need header, title,....).
`;
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(combineSelections())
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
            <Col span={16}>
             
              <Title level={4}>Your Selection:</Title>
              <Paragraph>{combineSelections()}</Paragraph>
              <Button
                type="primary"
                onClick={handleCopy}
                style={{ marginBottom: "16px" }}
              >
                Copy to Clipboard
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
