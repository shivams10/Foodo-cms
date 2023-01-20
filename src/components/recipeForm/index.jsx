import { Button, Card, Form, Input, Row, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './index.css';

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const RecipeForm = ({ onFinish, fields=[], loading = false, resetOnSubmit = true,heading }) => {
  const [form] = Form.useForm();

  function handleFinish(value) {
    onFinish(value);
    if (resetOnSubmit) form.resetFields();
  }

  return (
    <Card className="form" loading={loading}>
      <h1 style={{marginBottom:"10px"}}>{heading}</h1>
      <Form layout="vertical" onFinish={handleFinish} form={form} initialValues={fields}>
        <Form.Item
          className="recipe-input-group"
          label="Name"
          name="name"
          placeholder="Food name"
          required
          rules={[{ required: true, message: 'Please input game name', type: 'string' }]}>
          <Input name="name" />
        </Form.Item>
        <Form.Item label="Image" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Click To Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Steps"
          name="steps"
          placeholder="Food name"
          className="recipe-input-group"
          rules={[{ required: true, message: 'Please input game name', type: 'string' }]}>            
          <TextArea rows={4} />
        </Form.Item>
        <Row justify="end">
          <Form.Item>
            <Button type="default" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default RecipeForm;
