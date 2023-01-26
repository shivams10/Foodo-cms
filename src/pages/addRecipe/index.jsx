import axios from 'axios';
import { Space,message,Typography } from 'antd';
import { useMutation } from 'react-query';

import { LOCAL_API_URL } from '../../constants';
import RecipeForm from '../../components/recipeForm';
import BackButton from '../../components/backButton';
import { getToken } from '../../helpers';

const { Title } = Typography;
const authToken = getToken();

function addRecipe(data) {
  return axios.post(`${LOCAL_API_URL}/recipes`, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authToken}`
    }
  });
}

const AddRecipe = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate } = useMutation(addRecipe, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry added successfully' });
    },
    onError: (error) => {
      const { path, message } = error.response.data.error.details.errors[0];
      messageApi.open({ type: 'error', content: `${path[0]}: ${message.toLowerCase()}` });
    }
  });

  function handleFinish(value) {
    const { name, steps, image } = value;
    const data = {
      name,
      steps
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
    <div style={{marginTop:"75px"}}>
      <Space style={{width: '100%', justifyContent: 'space-between', alignItems: "center" }}>
        <BackButton />
      </Space>
      {contextHolder}
      <RecipeForm onFinish={handleFinish} heading="Add Recipe" />
    </div>
  );
};

export default AddRecipe;
