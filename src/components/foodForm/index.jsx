import { Button, Card, Form, Input, Row, Upload, Space, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FoodForm = ({ onFinish, fields = [], loading = false, resetOnSubmit = true, heading }) => {
  const [form] = Form.useForm();

  function handleFinish(value) {
    onFinish(value);
    if (resetOnSubmit) form.resetFields();
  }

  return (
    <Card className="form" loading={loading}>
      <h1 style={{ marginBottom: '10px' }}>{heading}</h1>
      <Form layout="vertical" onFinish={handleFinish} form={form} initialValues={fields}>
        <Input.Group>
          <div>
            <Space>
              <Form.Item
                label={'Set name'}
                name="name"
                labelCol={{ span: 24 }}
                required
                rules={[{ required: true, message: 'Please input food name', type: 'string' }]}
              >
                <Input type="text" placeholder="Food name" />
              </Form.Item>
              <Form.Item
                label={'Set category'}
                name="category"
                required
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please add category' }]}
              >
                <Select
                  placeholder="Add Category"
                  allowClear
                  style={{
                    width: 180
                  }}
                  options={[
                    {
                      value: 'biryani',
                      label: 'Biryani'
                    },
                    {
                      value: 'chicken',
                      label: 'Chicken'
                    },
                    {
                      value: 'vegetable',
                      label: 'Vegetable'
                    },
                    {
                      value: 'chinese',
                      label: 'Chinese'
                    },
                    {
                      value: 'paneer',
                      label: 'Paneer'
                    }
                  ]}
                />
              </Form.Item>
            </Space>
          </div>
          <div>
            <Space>
              <Form.Item
                label={'Set price'}
                name="price"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please input price' }]}
              >
                <Input type="number" placeholder="Food price" />
              </Form.Item>
              <Form.Item
                label={'Set rating'}
                name="rating"
                labelCol={{ span: 24 }}
                required
                rules={[{ required: true, message: 'Please add rating' }]}
              >
                <Select
                  className="rating"
                  placeholder="Add Rating"
                  style={{
                    width: 120
                  }}
                  options={[
                    {
                      value: 0,
                      label: '0'
                    }
                  ]}
                />
              </Form.Item>
            </Space>
          </div>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click To Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={'Set description'}
            name="description"
            labelCol={{ span: 24 }}
            required
            rules={[{ required: true, message: 'Please input description', type: 'string' }]}
          >
            <TextArea type="text" placeholder="Food description" />
          </Form.Item>
          <Form.Item>
            <Button className="submit-button" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Input.Group>
      </Form>
    </Card>
  );
};

export default FoodForm;
