import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input, Button, List, Avatar, Spin, Typography } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyDhOWmNxsygP4SXxqMRyLLJN0psE0UbDcs");

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setPrompt("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setMessages([...newMessages, { sender: "bot", text: responseText }]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Lỗi khi gọi API!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, background: "#f9f9f9", borderRadius: 10 }}>
      <Title level={2} style={{ textAlign: "center" }}>Chatbot AI</Title>
      <List
        bordered
        style={{ height: 400, overflowY: "auto", padding: "10px", background: "white" }}
        dataSource={messages}
        renderItem={(item) => (
          <List.Item style={{ textAlign: item.sender === "user" ? "right" : "left" }}>
            <List.Item.Meta
              avatar={<Avatar icon={item.sender === "user" ? <UserOutlined /> : <RobotOutlined />} />}
              title={item.sender === "user" ? "Bạn" : "AI"}
              description={item.text}
            />
          </List.Item>
        )}
      />
      
      {loading && <Spin style={{ display: "block", textAlign: "center", margin: "10px 0" }} />}

      <TextArea
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Nhập câu hỏi của bạn..."
        style={{ marginTop: 10 }}
      />
      <Button type="primary" onClick={handleSend} block style={{ marginTop: 10 }} disabled={loading}>
        Gửi
      </Button>
    </div>
  );
}
