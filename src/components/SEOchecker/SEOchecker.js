import React, { useState } from "react";
import { Layout, Input, Checkbox, Typography, Switch } from "antd";

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
export default function SEOchecker() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isCodeView, setIsCodeView] = useState(false);

  const wordCount = content.trim().split(/\s+/).length;
  const keywordInTitle = title.includes(keyword) && keyword !== "";
  const keywordInContent = content.includes(keyword) && keyword !== "";
  const keywordInFirst10Percent = content
    .slice(0, Math.ceil(content.length * 0.1))
    .includes(keyword);
  const contentLengthValid = wordCount >= 600 && wordCount <= 2500;

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
        <Content style={{ flex: 7, padding: "20px", background: "#fff" }}>
        <Title level={3}>SEO Content Checker</Title>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: "10px" }} />
        <Switch checked={isCodeView} onChange={() => setIsCodeView(!isCodeView)} style={{ marginBottom: "10px" }} /> Toggle Code View
        {isCodeView ? (
          <pre style={{ padding: "10px", background: "#f5f5f5", minHeight: "150px" }}>{content}</pre>
        ) : (
          <div style={{ padding: "10px", background: "#fff", minHeight: "150px", border: "1px solid #d9d9d9" }} dangerouslySetInnerHTML={{ __html: content }} />
        )}
        <TextArea rows={6} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} style={{ marginBottom: "10px" }} />
        <Input placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} style={{ marginBottom: "10px" }} />
      </Content>

      <Sider width={300} style={{ padding: "20px", background: "#fafafa" }}>
        <Title level={4}>Checklist</Title>
        <Checkbox checked={keywordInTitle}>
          {keywordInTitle
            ? "✅ Tuyệt vời! Bạn đang sử dụng từ khoá chính trong Tiêu đề SEO."
            : "❌ Từ khoá chính không xuất hiện trong tiêu đề SEO."}
        </Checkbox>
        <br />
        <br />
        <Checkbox checked={keywordInFirst10Percent}>
          {keywordInFirst10Percent
            ? "✅ Sử dụng Từ khoá chính ngay từ đầu nội dung của bạn."
            : "❌ Sử dụng Từ khoá chính ngay từ đầu nội dung của bạn."}
        </Checkbox>
        <br />
        <br />
        <Checkbox checked={keywordInContent}>
          {keywordInContent
            ? "✅ Từ khoá chính xuất hiện trong nội dung."
            : "❌ Từ khoá chính không xuất hiện trong nội dung."}
        </Checkbox>
        <br />
        <br />
        <Checkbox checked={contentLengthValid}>
          {contentLengthValid
            ? `✅ Nội dung hiện có độ dài là ${wordCount} từ.`
            : `❌ Nội dung hiện có độ dài là ${wordCount} từ. Hãy cân nhắc viết ít nhất 600 từ để tối ưu hóa.`}
        </Checkbox>
      </Sider>
    </Layout>
  );
}
