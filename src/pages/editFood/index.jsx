import { useParams } from 'react-router-dom';
import { Space, message } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import axios from 'axios';

import BackButton from '../../components/backButton';
import FoodForm from '../../components/foodForm';
import { LOCAL_API_URL } from '../../constants';
import { getToken } from '../../helpers';

const authToken = getToken();

function fetchFood({ queryKey }) {
  const id = queryKey[1];
  return axios.get(`${LOCAL_API_URL}/foods/${id}`, {
    params: {
      populate: '*'
    }
  });
}

function editFood({ id, formData }) {
  return axios.put(`${LOCAL_API_URL}/foods/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authToken}`
    }
  });
}

const EditFood = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [foodData, setFoodData] = useState([]);

  function updateFood(value) {
    const { name, price, rating, description, category, image } = value.attributes;

    const imageValue = (function () {
      if (image.data) {
        const {
          id,
          attributes: { name, url }
        } = image.data;
        return [{ id, name, url: `http://localhost:1337${url}` }];
      }
      return null;
    })();
    setFoodData({
      name,
      price,
      rating,
      category,
      description,
      image: imageValue
    });
  }

  const { isLoading, isError } = useQuery(['foods', id], fetchFood, {
    select: (data) => data.data.data,
    cacheTime: 0,
    onSuccess: updateFood
  });

  const { mutate } = useMutation(editFood, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry updated successfully' });
    },
    onError: (error) => {
      messageApi.open({ type: 'error', content: `${error}` });
    }
  });

  function handleFinish(value) {
    const { name, category, price, rating, description, image } = value;
    const data = {
      name,
      price,
      rating,
      category,
      description
    };
    const formData = new FormData();
    if (image.length) {
      if (image[0].originFileObj) {
        formData.append('files.image', image[0].originFileObj, image[0].name);
      } else {
        formData.append('files.image', null);
      }
    } else {
      data.image = null;
    }
    formData.append('data', JSON.stringify(data));
    mutate({ id, formData });
  }

  return (
    <div className="edit-recipe-conatiner">
      <Space>
        <BackButton />
      </Space>
      {contextHolder}
      {isError ? (
        <Title level={3}>An error occurred. Please try again later</Title>
      ) : isLoading ? (
        <Title>Loading</Title>
      ) : (
        <FoodForm
          onFinish={handleFinish}
          fields={foodData}
          loading={isLoading}
          resetOnSubmit={false}
          heading="Edit Food"
        />
      )}
    </div>
  );
};

export default EditFood;
