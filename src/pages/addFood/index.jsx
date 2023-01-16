import { useState } from 'react';
import { Button, Form, Input, Select, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

import './index.css';
import { useAddFoodData } from '../../hooks/useFoodsData';
import BackButton from '../../components/backButton';

const AddFood = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState([]);

  const { mutate: addFood } = useAddFoodData();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      setImage(e);
      return e;
    }
    setImage(e?.fileList);
    return e?.fileList;
  };

  const handleAddFood = () => {
    if (
      name.trim() === '' ||
      category.trim() === '' ||
      price.trim() === '' ||
      description.trim() === ''
    ) {
      setErrorMessage('All fields are necessary !');
      return;
    }

    if (description.length < 5) {
      setErrorMessage('Description must be atleast 5 characters long');
      return;
    }

    const data = { name, category, price, description, rating };

    const formData = new FormData();
    if (image?.length) {
      if (image[0].originFileObj) {
        formData.append('files.image', image[0].originFileObj, image[0].name);
      } else {
        formData.append('files.image', null);
      }
    } else {
      data.image = null;
    }

    formData.append('data', JSON.stringify(data));
    addFood(formData);
  };

  return (
    <div className="add-food-container">
      <Space>
        <BackButton />
      </Space>
      <div className="form">
        <h1>Add Food Details</h1>
        <p>{errorMessage && <span className="error-message">{errorMessage}</span>}</p>
        <Space>
          <Form layout="horizontal" size="medium">
            <Input.Group>
              <div>
                <Space>
                  <Form.Item label={'Set name'} labelCol={{ span: 24 }}>
                    <Input
                      type="text"
                      placeholder="Food name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label={'Set category'} labelCol={{ span: 24 }}>
                    <Input
                      type="text"
                      placeholder="Food Category"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Form.Item>
                </Space>
              </div>
              <div>
                <Space>
                  <Form.Item label={'Set price'} labelCol={{ span: 24 }}>
                    <Input
                      type="number"
                      placeholder="Food price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label={'Set rating'} labelCol={{ span: 24 }}>
                    <Select
                      className="rating"
                      defaultValue="0"
                      disabled={true}
                      style={{
                        width: 120
                      }}
                      onChange={(e) => setRating(e.target.value)}
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
                labelCol={{ span: 24 }}
                name="image"
                getValueFromEvent={normFile}
                valuePropName="fileList"
              >
                <Upload type="file" beforeUpload={() => false} listType="picture">
                  <Button icon={<UploadOutlined />}>Click To Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label={'Set description'} labelCol={{ span: 24 }}>
                <TextArea
                  type="text"
                  placeholder="Food description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button className="submit-button" htmlType="submit" onClick={handleAddFood}>
                  Submit
                </Button>
              </Form.Item>
            </Input.Group>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default AddFood;
