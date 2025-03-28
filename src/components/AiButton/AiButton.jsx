import React, { useState } from "react";
import { Button, message } from "antd";
import { saveAs } from "file-saver";
import { GoogleGenerativeAI } from "@google/generative-ai"; 

export default function AiButton({ prompts = [], onComplete }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  const genAI = new GoogleGenerativeAI("AIzaSyDhOWmNxsygP4SXxqMRyLLJN0psE0UbDcs"); 

  const handleGenerate = async () => {
    if (!prompts.length) {
      message.warning("Không có prompt nào để xử lý!");
      return;
    }

    setLoading(true);
    setTotalTime(0);

    const prompt = prompts[0]; // Chỉ lấy prompt đầu tiên
    const startTime = Date.now();

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(JSON.stringify(prompt));
      const responseText = result.response.text();

      setResponse(responseText);
      setTotalTime((Date.now() - startTime) / 1000);

      // Callback để xử lý kết quả
      if (onComplete) onComplete({ prompt, response: responseText });

      // Lưu kết quả thành file JSON
      // saveAs(
      //   new Blob([JSON.stringify({ prompt, response: responseText }, null, 2)], {
      //     type: "application/json",
      //   }),
      //   "ai_response.json"
      // );
    } catch (error) {
      console.error("Lỗi khi gọi AI:", error);
      message.error("Lỗi khi xử lý yêu cầu.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleGenerate} loading={loading}>
        Gửi đến AI
      </Button>
      <p>⏱️ Tổng thời gian: {totalTime.toFixed(2)}s</p>
      {response && <pre>{response}</pre>}
    </div>
  );
}
