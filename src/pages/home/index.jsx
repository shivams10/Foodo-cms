import { Table } from 'antd';

import { useFoodsData } from '../../hooks/useFoodsData';
import Header from '../../components/header';

export const HomePage = () => {
  const { isLoading, data, isError, error } = useFoodsData();
  const Columns = [
    { title: 'Id', dataIndex: 'id', key: 'id', width: 50 },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 100
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 250
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 150
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      width: 100
    }
  ];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const tableData = isLoading
    ? 'wait'
    : data.map(({ id, attributes }) => {
        const { name, price, rating, description, category } = attributes;
        return {
          key: id,
          id,
          name,
          price,
          rating,
          description,
          category
        };
      });

  return (
    <div style={{ marginTop: '70px' }}>
      <Header value="Food List" link="/add-food" />
      <Table
        dataSource={tableData}
        columns={Columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
      />
    </div>
  );
};
