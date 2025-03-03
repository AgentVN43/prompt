import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Layout,
    message,
    Row,
    Select,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/skeleton/Title";
import React, { useState } from "react";
import taskJson from "../../constants/business/task.json";
const { TextArea } = Input;
const { Option } = Select;
export default function DigitalMarketing() {
  const [formData, setFormData] = useState({
    product_service_info: {
      name: "",
      description: "",
      unique_selling_point: [
        { important: "" },
        { distinctive: "" },
        { superior: "" },
        { communicable: "" },
        { exclusivity: "" },
        { affordable: "" },
        { profitable: "" },
      ],
      price_range: "",
      target_audience: {
        age_range: "",
        gender: "",
        location: "",
        interests: "",
      },
    },
    business_goals: {
      primary_goal: "",
      secondary_goal: "",
      kpis: [""],
    },
    competitor_analysis: {
      main_competitors: [
        { name: "", strengths: "", weaknesses: "" },
        { name: "", strengths: "", weaknesses: "" },
      ],
    },
    current_marketing_status: {
      existing_channels: [""],
      current_performance: "",
      budget: "",
    },
    preferred_channels: [""],
    content_preferences: {
      content_type: [""],
      tone_of_voice: "",
    },
    additional_info: {
      timeline: "",
      special_requirements: "",
    },
    task: "",
    result_type:""
  });

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(JSON.stringify(formData, null, 2))
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch(() => {
        message.error("Failed to copy!");
      });
  };

  return (
    <Layout
      style={{ display: "flex", justifyContent: "center", padding: "0 2.5%" }}
    >
      <Content style={{ maxWidth: "100%" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Title level={4}>Select Options</Title>
            <Form
              layout="vertical"
              initialValues={formData}
              onValuesChange={handleFormChange}
              onFinish={handleSubmit}
            >
              <Form.Item label="Gender" name={["task"]}>
                <Select>
                  {taskJson.map((item, index) => (
                    <Option key={item.task_id} value={item.description}>
                      {item.task_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Product/Service Info */}
              <h2>Product/Service Info</h2>
              <Form.Item label="Name" name={["product_service_info", "name"]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name={["product_service_info", "description"]}
              >
                <TextArea rows={2} />
              </Form.Item>
              <Form.List
                name={["product_service_info", "unique_selling_point"]}
              >
                {(fields) =>
                  fields.map((field, index) => (
                    <Form.Item
                      key={field.key}
                      label={`Unique Selling Point: ${index + 1}`}
                      name={[
                        field.name,
                        Object.keys(
                          formData.product_service_info.unique_selling_point[
                            index
                          ]
                        )[0],
                      ]}
                    >
                      <Input placeholder="Enter point" />
                    </Form.Item>
                  ))
                }
              </Form.List>
              <Form.Item
                label="Price Range"
                name={["product_service_info", "price_range"]}
              >
                <Input />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Age Range"
                    name={[
                      "product_service_info",
                      "target_audience",
                      "age_range",
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Gender"
                    name={["product_service_info", "target_audience", "gender"]}
                  >
                    <Select>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Both">Both</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Location"
                    name={[
                      "product_service_info",
                      "target_audience",
                      "location",
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Interests"
                name={["product_service_info", "target_audience", "interests"]}
              >
                <Input />
              </Form.Item>

              {/* Business Goals */}
              <h2>Business Goals</h2>
              <Form.Item
                label="Primary Goal"
                name={["business_goals", "primary_goal"]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Secondary Goal"
                name={["business_goals", "secondary_goal"]}
              >
                <Input />
              </Form.Item>
              <Form.List name={["business_goals", "kpis"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item key={field.key} label={`KPI ${index + 1}`}>
                        <Input
                          {...field}
                          placeholder="Enter KPI"
                          addonAfter={
                            <Button
                              type="link"
                              danger
                              onClick={() => remove(field.name)}
                            >
                              Remove
                            </Button>
                          }
                        />
                      </Form.Item>
                    ))}
                    <Button type="dashed" onClick={() => add()}>
                      Add KPI
                    </Button>
                  </>
                )}
              </Form.List>

              {/* Competitor Analysis */}
              <h2>Competitor Analysis</h2>
              <Form.List name={["competitor_analysis", "main_competitors"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key}>
                        <h3>Competitor {index + 1}</h3>
                        <Form.Item
                          label="Name"
                          name={[field.name, "name"]}
                          rules={[
                            { required: true, message: "Name is required" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Strengths"
                          name={[field.name, "strengths"]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Weaknesses"
                          name={[field.name, "weaknesses"]}
                        >
                          <Input />
                        </Form.Item>
                        <Button
                          type="link"
                          danger
                          onClick={() => remove(field.name)}
                        >
                          Remove Competitor
                        </Button>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()}>
                      Add Competitor
                    </Button>
                  </>
                )}
              </Form.List>

              {/* Current Marketing Status */}
              <h2>Current Marketing Status</h2>
              <Form.List
                name={["current_marketing_status", "existing_channels"]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item key={field.key} label={`Channel ${index + 1}`}>
                        <Input
                          {...field}
                          placeholder="Enter Channel"
                          addonAfter={
                            <Button
                              type="link"
                              danger
                              onClick={() => remove(field.name)}
                            >
                              Remove
                            </Button>
                          }
                        />
                      </Form.Item>
                    ))}
                    <Button type="dashed" onClick={() => add()}>
                      Add Channel
                    </Button>
                  </>
                )}
              </Form.List>
              <Form.Item
                label="Current Performance"
                name={["current_marketing_status", "current_performance"]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Budget"
                name={["current_marketing_status", "budget"]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              {/* Preferred Channels */}
              <h2>Preferred Channels</h2>
              <Form.List name={["preferred_channels"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item key={field.key} label={`Channel ${index + 1}`}>
                        <Input
                          {...field}
                          placeholder="Enter Channel"
                          addonAfter={
                            <Button
                              type="link"
                              danger
                              onClick={() => remove(field.name)}
                            >
                              Remove
                            </Button>
                          }
                        />
                      </Form.Item>
                    ))}
                    <Button type="dashed" onClick={() => add()}>
                      Add Channel
                    </Button>
                  </>
                )}
              </Form.List>

              {/* Additional Info */}
              <h2>Additional Info</h2>
              <Form.Item
                label="Timeline"
                name={["additional_info", "timeline"]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Special Requirements"
                name={["additional_info", "special_requirements"]}
              >
                <TextArea rows={3} />
              </Form.Item>

              {/* Content Preferences */}
              <Form.Item
                label="Content Type"
                name={["content_preferences", "content_type"]}
              >
                <Select mode="tags" placeholder="Select or add content types">
                  <Option value="video">Video</Option>
                  <Option value="blog">Blog</Option>
                  <Option value="infographic">Infographic</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Tone of Voice"
                name={["content_preferences", "tone_of_voice"]}
              >
                <Input placeholder="Enter tone of voice" />
              </Form.Item>

              <Form.Item
                label="Result Type"
                name={["result_type"]}
              >
                <Select mode="tags" placeholder="Select or add result types">
                  <Option value="table">Excel</Option>
                  <Option value="markdown">Blog</Option>
                  <Option value="list">List</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <Title level={4}>Your Selection:</Title>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <Button
              type="primary"
              onClick={handleCopy}
              style={{ marginBottom: "16px" }}
            >
              Copy to Clipboard
            </Button>
          </Col>
          {/* <Col span={8}>
            <Title level={4}>Select Options</Title>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </Col> */}
        </Row>
      </Content>
    </Layout>
  );
}
