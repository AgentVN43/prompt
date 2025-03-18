import React, { useState } from "react";
import backupData from "../../backupData";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiAdGenerator = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatData = (key, values) =>
        values.length > 0 ? `- ${key}: ${values.join(", ")}` : `- ${key}: không có`;

    const generatePrompt = () => {
        return `
      Dựa trên các key trong bảng (Sản phẩm, Local, Need, Price, People, Trend, Promotion) bên dưới.
      Hãy tạo 52 tiêu đề bài viết hấp dẫn ngắn gọn cho một web site đại lý bán hàng
      ${formatData("Sản phẩm", backupData.product)}
      ${formatData("Khu vực", backupData.localtion)}
      ${formatData("Nhu cầu", backupData.need)}
      ${formatData("Giá", backupData.price)}
      ${formatData("Đối tượng", backupData.people)}
      ${formatData("Xu hướng", backupData.trend)}
      ${formatData("Khuyến mãi", backupData.promotion)}
      Lưu ý hãy đảm bảo mỗi key đều được sử dụng ít nhất 1 lần. 
      Kết quả cuối cùng chỉ hiển thị đúng 52 tiêu đề cách nhau 1 dấu ,
    `;
    };
    // Kết quả cuối cùng chỉ hiển thị đúng 52 tiêu đề, mỗi tiêu đề trên 1 dòng
    const fetchAIResponse = async () => {
        setLoading(true);
        try {
            const genAI = new GoogleGenerativeAI(
                "AIzaSyDhOWmNxsygP4SXxqMRyLLJN0psE0UbDcs"
            );
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = generatePrompt();
            console.log("🚀 ~ fetchAIResponse ~ prompt:", prompt)
            const result = await model.generateContent(prompt);
            const response = await result.response.text();

            setAds(response.split("\n").filter((line) => line.trim() !== ""));
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Tool - Tạo tiêu đề</h2>
            <button onClick={fetchAIResponse} disabled={loading}>
                {loading ? "Đang tạo tiêu đề..." : "Tạo tiêu đề"}
            </button>

            <ul>
                {ads.map((ad, index) => (
                    <p key={index}>{ad}</p>
                ))}
            </ul>
        </div>
    );
};

export default GeminiAdGenerator;
