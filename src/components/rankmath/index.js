import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Row,
  Col,
  Collapse,
  Spin,
  Select,
} from "antd";
import axios from "axios";
import Prompt from "../prompt";
import footer from "../../constants/defaultFooter/defaultFooter.json";
const { Option } = Select;

const RankMath = () => {
  const [domain, setDomain] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [rankMathDescription, setRankMathDescription] = useState(
    currentProduct?.rank_math_description || ""
  );
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  
  const defaultFooterContent = footer.defaultFooter;


  const [loadingModal, setLoadingModal] = useState([]);
  const [productURL, setProductURL] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // const consumerKey = "ck_a42c6926c916de32fd2b510778d76f6d001524da";
  // const consumerSecret = "cs_303547b5f7fdd354d30cafbbc357141125b61458";

  // // Domain: tongkhotranganh.com
  // const consumerKey = "ck_6dbd444b3b21ac5405869054c3b021b7e2f32e5f";
  // const consumerSecret = "cs_b28ca5284df36150f116b95cc1759af6753fd225";

  // Domain: bepphugia
  // const consumerKey = "ck_da8e1b8c5b54e398e4d0303789dd9a4b13015903";
  // const consumerSecret = "cs_a874581785faafcafe9ba8c433aeeb1f36d51235";

  // Fetch products for a specific page
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${domain}/wp-json/wc/v3/products?page=${page}`,
        {
          auth: {
            username: credentials.username,
            password: credentials.password,
          },
        }
      );

      console.log(response.data);

      const filteredProducts = response.data.filter((product) => {
        const seoScore = product.meta_data.find(
          (meta) => meta.key === "rank_math_seo_score"
        );
        return seoScore && parseInt(seoScore.value, 10) < 70;
      });
      console.log(filteredProducts);

      setProducts(filteredProducts);
      setPagination({
        current: page,
        pageSize: 10,
        total: parseInt(response.headers["x-wp-total"], 10) || 0,
      });
    } catch (error) {
      message.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Handle table pagination change
  const handleTableChange = (pagination) => {
    console.log("Page changed:", pagination.current);

    fetchProducts(pagination.current);
  };

  // Open modal with product details
  const openModal = (product) => {
    setCurrentProduct(product);
    setModalVisible(true);
  };
  // Handle Input change
  const handleInputChange = (e) => {
    setRankMathDescription(e.target.value);
  };

  const getAllProductUrls = async () => {
    let page = 1;
    let allProductUrls = [];

    while (true) {
      try {
        const response = await axios.get(`${domain}/wp-json/wc/v3/products`, {
          params: { page, per_page: 100 }, // Adjust per_page as needed
          auth: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (response.data.length === 0) break; // No more products, exit loop

        const productUrls = response.data.map(
          (product) => `${domain}/san-pham/${product.slug}`
        );
        allProductUrls = [...allProductUrls, ...productUrls];

        page++; // Move to next page
      } catch (error) {
        console.error("Error fetching products:", error);
        break;
      }
    }

    setProductURL(allProductUrls); // Store URLs in state
    console.log(allProductUrls); // Log the URLs to console
  };

  // Update product through the API
  const updateProduct = async (values) => {
    try {
      setLoading(true); // Show loading spinner
      await axios.put(
        `${domain}/wp-json/wc/v3/products/${currentProduct.id}`,
        {
          ...values,
          date_modified: new Date().toISOString(),
          meta_data: [
            {
              key: "rank_math_focus_keyword",
              value: values.rank_math_focus_keyword,
            },
            {
              key: "rank_math_description",
              value: values.rank_math_description,
            },
          ],
        },
        {
          auth: {
            username: credentials.username,
            password: credentials.password,
          },
        }
      );
      message.success("Product updated successfully");
      setModalVisible(false);
      setCurrentProduct(null);
      fetchProducts(pagination.current); // Reload the current page
    } catch (error) {
      message.error("Failed to update product");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Short Description",
      dataIndex: "short_description",
      key: "short_description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => openModal(record)}>
          Edit
        </Button>
      ),
    },
  ];
  const descriptionRef = useRef(null);
  useEffect(() => {
    if (currentProduct) {
      form.setFieldsValue({
        name: currentProduct.name,
        slug: currentProduct.slug,
        description: currentProduct.description,
        short_description: currentProduct.short_description,
        rank_math_focus_keyword:
          currentProduct.meta_data.find(
            (meta) => meta.key === "rank_math_focus_keyword"
          )?.value || "",
      });
    } else {
      form.resetFields(); // Reset fields if no current product
    }
  }, [currentProduct, form]);

  const handleAddImage = (name) => {
    const currentDesc = form.getFieldValue("description") || "";
    const imgSrc = form.getFieldValue("images");
    if (imgSrc && descriptionRef.current) {
      // Truy cập DOM TextArea của Ant Design Input.TextArea
      const textarea = descriptionRef.current.resizableTextArea?.textArea;
      if (textarea) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const before = currentDesc.substring(0, startPos);
        const after = currentDesc.substring(endPos);
        const insertHTML = `<img src="${imgSrc}" alt="${name}" />`;
        const newDesc = before + insertHTML + after;
        form.setFieldsValue({ description: newDesc });
        // Đưa con trỏ về sau đoạn chèn
        textarea.focus();
        const cursorPos = startPos + insertHTML.length;
        textarea.setSelectionRange(cursorPos, cursorPos);
      }
    }
  };

  const enterLoading = (index) => {
    setLoadingModal((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadingModal((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const credentialsList = process.env.REACT_APP_CREDENTIALS
    ? process.env.REACT_APP_CREDENTIALS.split(";").map((entry) => {
        const [domain, username, password] = entry.split(",");
        return { domain, username, password };
      })
    : [];

  const handleChange = (selectedDomain) => {
    const selectedCredentials = credentialsList.find(
      (item) => item.domain === selectedDomain
    );
    if (selectedCredentials) {
      setDomain(selectedDomain);
      setCredentials({
        username: selectedCredentials.username,
        password: selectedCredentials.password,
      });
    }
  };

  useEffect(() => {
    if (currentProduct) {
      form.resetFields();
      form.setFieldsValue({
        name: currentProduct.name,
        slug: currentProduct.slug,
        description: currentProduct.description,
        images:
          currentProduct.images?.length > 0 ? currentProduct.images[0].src : "",
        short_description: currentProduct.short_description,
        rank_math_focus_keyword:
          currentProduct.meta_data.find(
            (meta) => meta.key === "rank_math_focus_keyword"
          )?.value || "",
        // Nếu cần, bạn cũng có thể cập nhật rank_math_description hoặc footer
      });
    }
  }, [currentProduct, form]);

  const EditProductModal = ({
    modalVisible,
    setModalVisible,
    currentProduct,
    updateProduct,
    defaultFooterContent,
    loadingModal,
    enterLoading,
  }) => {
    const [form] = Form.useForm();
    // Sử dụng ref để truy cập Input.TextArea của Description
    const descriptionRef = useRef(null);

    // Cập nhật form mỗi khi currentProduct thay đổi
    useEffect(() => {
      if (currentProduct) {
        form.resetFields();
        form.setFieldsValue({
          name: currentProduct.name,
          slug: currentProduct.slug,
          description: currentProduct.description,
          images:
            currentProduct.images?.length > 0
              ? currentProduct.images[0].src
              : "",
          short_description: currentProduct.short_description,
          rank_math_focus_keyword:
            currentProduct.meta_data.find(
              (meta) => meta.key === "rank_math_focus_keyword"
            )?.value || "",
        });
      }
    }, [currentProduct, form]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        placeholder="Enter domain (e.g., https://example.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Select
        placeholder="Select a domain"
        style={{ width: "100%", marginBottom: "20px" }}
        onChange={handleChange}
      >
        {credentialsList.map((item) => (
          <Option key={item.domain} value={item.domain}>
            {item.domain}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        onClick={() => fetchProducts(1)}
        disabled={!domain}
        style={{ marginBottom: "20px" }}
      >
        Load Products
      </Button>
      <Button
        type="primary"
        onClick={() =>
          window.open(
            `${domain}/wp-admin/admin.php?page=rank-math-status&view=tools#`,
            "_blank"
          )
        }
        disabled={!domain}
        style={{ marginBottom: "20px" }}
      >
        Update Score
      </Button>
      <Button
        type="primary"
        onClick={getAllProductUrls}
        disabled={!domain}
        style={{ marginBottom: "20px" }}
      >
        Fetch Product URLs
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        style={{ marginTop: "20px" }}
      />
      <Spin spinning={loading}>
        <Modal
          title="Edit Product"
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setCurrentProduct(null);
            form.resetFields();
          }}
          footer={null}
          width={1024}
        >
          {currentProduct && (
            <Form
              key={currentProduct.id}
              layout="vertical"
              form={form}
              onFinish={(values) => {
                // Combine description and footer into one complete description
                const completeDescription = `${values.description || ""}\n\n${
                  defaultFooterContent || ""
                }`;

                const { images, ...rest } = values;

                const updatedProduct = {
                  ...rest,
                  description: completeDescription, // Replace the description field with the combined value
                };

                updateProduct(updatedProduct); // Call your update function with the modified data
              }}
              initialValues={{
                name: currentProduct.name,
                slug: currentProduct.slug,
                description: currentProduct.description,
                images:
                  currentProduct.images?.length > 0
                    ? currentProduct.images[0].src
                    : "",
                short_description: currentProduct.short_description,
                rank_math_focus_keyword:
                  currentProduct.meta_data.find(
                    (meta) => meta.key === "rank_math_focus_keyword"
                  )?.value || "",
              }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={4} ref={descriptionRef} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Rank Math Focus Keyword"
                    name="rank_math_focus_keyword"
                  >
                    <Input
                      value={rankMathDescription}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Rank Math Description"
                    name="rank_math_description"
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Images"
                    name="images"
                    rules={[{ required: true }]}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={() => handleAddImage(currentProduct.name)}
                  >
                    Add Image to Description
                  </Button>
                </Col>
                <Col span={12}>
                  <Form.Item label="Footer Content" name="footer">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "10px" }}
                loading={loadingModal[0]}
                onClick={() => enterLoading(0)}
              >
                Save
              </Button>
              <Row gutter={24}>
                <Col span={24}>
                  <Prompt
                    name={currentProduct.name}
                    keywords={rankMathDescription}
                    description={currentProduct.description}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Modal>
      </Spin>
    </div>
  );
};

export default RankMath;
