import { useParams } from 'react-router-dom';
import { Space, message } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import axios from 'axios';

import './index.css';
import BackButton from '../../components/backButton';
import RecipeForm from '../../components/recipeForm';
import { LOCAL_API_URL } from '../../constants';
import { getToken } from '../../helpers';

const authToken = getToken();

function fetchRecipe({ queryKey }) {
  const id = queryKey[1];
  return axios.get(`${LOCAL_API_URL}/recipes/${id}`, {
    params: {
      populate: '*'
    }
  });
}

function editRecipe({ id, formData }) {
  return axios.put(`${LOCAL_API_URL}/recipes/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authToken}`
    }
  });
}

const EditRecipe = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [recipeData, setRecipeData] = useState([]);

  function updateRecipe(value) {
    const { name, steps, image } = value.attributes;

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
    setRecipeData({
      name,
      steps,
      image: imageValue
    });
  }

  const { isLoading, isError } = useQuery(['recipes', id], fetchRecipe, {
    select: (data) => data.data.data,
    cacheTime: 0,
    onSuccess: updateRecipe
  });

  const { mutate } = useMutation(editRecipe, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry updated successfully' });
    },
    onError: (error) => {
      messageApi.open({ type: 'error', content: `${error}` });
    }
  });

  function handleFinish(value) {
    const { name, steps, image } = value;
    const data = {
      name,
      steps
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
        <RecipeForm
          onFinish={handleFinish}
          fields={recipeData}
          loading={isLoading}
          resetOnSubmit={false}
          heading="Edit Recipe"
        />
      )}
    </div>
  );
};

export default EditRecipe;
