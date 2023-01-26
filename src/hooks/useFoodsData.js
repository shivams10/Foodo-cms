import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const fetchFoodData = () => {
  return axios.get('http://localhost:1337/api/foods?populate=*');
};

export const useFoodsData = () => {
  return useQuery('foods-data', fetchFoodData, {
    select: (data) => data.data.data.map((food) => food)
  });
};

const addFood = (data) => {
  return axios.post(`http://localhost:1337/api/foods`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
  });
};

export const useAddFoodData = () => {
  return useMutation(addFood);
};

function deleteFood(id) {
  return axios.delete(`http://localhost:1337/api/foods/${id}`);
}

export const useDeleteFoodData = (onSuccess) => {
  return useMutation(deleteFood, {
    onSuccess
  });
};
