import { Button, Form, Input, message } from "antd";
import React from "react";

export default function ChatGPT() {
  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "https://hook.us2.make.com/8w6amc31mz8cyaucvo4x9olcwhwub3jk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      message.success("Data sent successfully!");
    } catch (error) {
      message.error("Failed to send data: " + error.message);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
