// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Input, Button, List, Avatar, Spin, Typography } from "antd";
// import { UserOutlined, RobotOutlined } from "@ant-design/icons";

// const { TextArea } = Input;
// const { Title } = Typography;

// export default function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);

//   const genAI = new GoogleGenerativeAI("AIzaSyDhOWmNxsygP4SXxqMRyLLJN0psE0UbDcs");

//   const handleSend = async () => {
//     if (!prompt.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: prompt }];
//     setMessages(newMessages);
//     setPrompt("");
//     setLoading(true);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const result = await model.generateContent(prompt);
//       const responseText = result.response.text();

//       setMessages([...newMessages, { sender: "bot", text: responseText }]);
//     } catch (error) {
//       console.error("Error generating AI response:", error);
//       setMessages([...newMessages, { sender: "bot", text: "⚠️ Lỗi khi gọi API!" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20, background: "#f9f9f9", borderRadius: 10 }}>
//       <Title level={2} style={{ textAlign: "center" }}>Chatbot AI</Title>
//       <List
//         bordered
//         style={{ height: 400, overflowY: "auto", padding: "10px", background: "white" }}
//         dataSource={messages}
//         renderItem={(item) => (
//           <List.Item style={{ textAlign: item.sender === "user" ? "right" : "left" }}>
//             <List.Item.Meta
//               avatar={<Avatar icon={item.sender === "user" ? <UserOutlined /> : <RobotOutlined />} />}
//               title={item.sender === "user" ? "Bạn" : "AI"}
//               description={item.text}
//             />
//           </List.Item>
//         )}
//       />

//       {loading && <Spin style={{ display: "block", textAlign: "center", margin: "10px 0" }} />}

//       <TextArea
//         rows={2}
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Nhập câu hỏi của bạn..."
//         style={{ marginTop: 10 }}
//       />
//       <Button type="primary" onClick={handleSend} block style={{ marginTop: 10 }} disabled={loading}>
//         Gửi
//       </Button>
//     </div>
//   );
// }
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input, Button, List, Avatar, Spin, Typography, message } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

const { TextArea } = Input;
const { Title } = Typography;

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [totalTitles, setTotalTitles] = useState(0);
  const [responsesReceived, setResponsesReceived] = useState(0);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDhOWmNxsygP4SXxqMRyLLJN0psE0UbDcs"
  );
  const promptTemplate = (title) => {
    const keyword = "hút mùi bếp";
    const product = "máy hút mùi";
    return {
      expertise:
        "You are an expert in content marketing with deep SEO knowledge.",
      action: "Write",
      language: "Vietnamese",
      product: product,
      keyword: keyword,
      title: title,
      structure: {
        goal: "Write an SEO-optimized blog post to rank high on SERP.",
        outline:
          "The article must be well-structured with 7-8 sections using [h2] and [h3]." +
          "Total word count: 1,500 - 2,000 words." +
          "Content must be engaging, informative, and provide value to the reader.",

        mainTitle: {
          instruction:
            `The title must start with '${keyword}'.` +
            "Ensure it is engaging, clear, and not exceed 60 characters." +
            "Capitalize the first letter of each word.",
        },

        seoOptimization: {
          keywords: [keyword],
          keywordUsage:
            "Ensure the main keyword appears in:" +
            "- Title" +
            "- First 100 words" +
            "- At least 3 subheadings (h2/h3)" +
            "- The last paragraph",
        },
      },

      paragraphRules:
        "Each paragraph should be 2-3 sentences long for easy readability.",
      languageRules: "Use natural, conversational language.",
      outputFormat: "HTML format with proper semantic tags (h1, h2, h3, p). Start with <div> tag and avoid including headers, titles, or irrelevant content.",
    };
  };
  const [countdown, setCountdown] = useState(0);
  const [totalTime, setTotalTime] = useState(5);

  const handleGenerate = async () => {
    setLoading(true);
    let generatedResponses = [];
    setResponsesReceived(0); // Reset số lượng phản hồi nhận được
    setCountdown(5); // Countdown delay ban đầu
    setTotalTime(0); // Reset tổng thời gian xử lý

    let startTime = Date.now(); // Bắt đầu tính tổng thời gian xử lý

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const prompt = promptTemplate(title);
      let requestStartTime = Date.now(); // Bắt đầu tính thời gian gửi request

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(JSON.stringify(prompt));
        const responseText = result.response.text();

        generatedResponses.push({ title, response: responseText });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Generated content for: ${title}` },
        ]);

        setResponsesReceived((prev) => prev + 1);

        // Cập nhật tổng thời gian xử lý từ request đến response
        setTotalTime((prev) => prev + (Date.now() - requestStartTime) / 1000); // Đổi ms → s
      } catch (error) {
        console.error("Error generating AI response:", error);
        message.error(`Lỗi khi xử lý tiêu đề: ${title}`);
      }

      // Countdown delay giữa các request
      for (let sec = 60; sec > 0; sec--) {
        setCountdown(sec);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Đảm bảo lưu file nếu có response thành công
    if (generatedResponses.length > 0) {
      saveAs(
        new Blob([JSON.stringify(generatedResponses, null, 2)], {
          type: "application/json",
        }),
        "ai_responses.json"
      );
    } else {
      message.warning("Không có phản hồi AI nào được tạo.");
    }

    setResponses(generatedResponses);
    setLoading(false);

    // Hiển thị tổng thời gian xử lý khi tất cả request đã hoàn thành
    setTotalTime((Date.now() - startTime) / 1000); // Chuyển ms → s
  };

  const handleTitleChange = (e) => {
    const titlesArray = e.target.value
      .split(";")
      .map((t) => t.trim())
      .filter((t) => t);
    setTitles(titlesArray);
    console.log("🚀 ~ handleTitleChange ~ titlesArray:", titlesArray)
    setTotalTitles(titlesArray.length); // Cập nhật tổng số tiêu đề
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        background: "#f9f9f9",
        borderRadius: 10,
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Chatbot AI
      </Title>
      <div style={{ marginBottom: 10 }}>
        <p>Tổng số tiêu đề: {totalTitles}</p>
        <p>
          Phản hồi đã nhận: {responsesReceived}/{totalTitles}
        </p>
      </div>
      <div>
        <p>⏳ Thời gian chờ giữa request: {countdown} giây</p>
        <p>⏱️ Tổng thời gian xử lý: {totalTime} giây</p>
      </div>

      <TextArea
        rows={4}
        placeholder="Nhập danh sách tiêu đề, cách nhau bởi dấu phẩy"
        onChange={handleTitleChange}
        style={{ marginBottom: 10 }}
      />

      <Button type="primary" onClick={handleGenerate} block disabled={loading}>
        {loading ? <Spin /> : "Bắt đầu tạo nội dung"}
      </Button>

      <List
        bordered
        style={{ marginTop: 20, background: "white" }}
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={
                    item.sender === "user" ? (
                      <UserOutlined />
                    ) : (
                      <RobotOutlined />
                    )
                  }
                />
              }
              title={item.sender === "user" ? "Bạn" : "AI"}
              description={item.text}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
