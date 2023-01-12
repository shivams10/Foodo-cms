import { useQuery } from 'react-query';
import axios from 'axios';

const fetchFoodData = () => {
  return axios.get('http://localhost:1337/api/foods?populate=*');
};

export const useFoodsData = () => {
  return useQuery('foods-data', fetchFoodData, {
    select: (data) => data.data.data.map((food) => food)
  });
};
