import { useMutation } from 'react-query';
import { Space, message } from 'antd';
import axios from 'axios';

import './index.css';
import { LOCAL_API_URL } from '../../constants';
import { getToken } from '../../helpers';
import FoodForm from '../../components/foodForm';
import BackButton from '../../components/backButton';

const authToken = getToken();

function addFood(data) {
  return axios.post(`${LOCAL_API_URL}/foods`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authToken}`
    }
  });
}

const AddFood = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate } = useMutation(addFood, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry added successfully' });
    },
    onError: (error) => {
      const { path, message } = error.response.data.error.details.errors[0];
      messageApi.open({ type: 'error', content: `${path[0]}: ${message.toLowerCase()}` });
    }
  });

  function handleFinish(value) {
    const { name, category, price, description, rating, image } = value;
    const data = {
      name,
      category,
      price,
      rating,
      description
    };
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
    mutate(formData);
  }

  return (
    <div className="add-food-container">
      <Space>
        <BackButton />
      </Space>
      {contextHolder}
      <FoodForm onFinish={handleFinish} heading="Add Food" />
    </div>
  );
};

export default AddFood;
