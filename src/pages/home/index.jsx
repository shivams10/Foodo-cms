import { useNavigate } from 'react-router-dom';
import { Button, Space, Table, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useFoodsData } from '../../hooks/useFoodsData';
import Header from '../../components/header';
import { useDeleteFoodData } from '../../hooks/useFoodsData';

export const HomePage = () => {
  const navigate = useNavigate();

  const { isLoading, data, isError, error, isFetching, refetch } = useFoodsData();

  const onSuccess = () => {
    refetch();
  };

  const { mutate } = useDeleteFoodData(onSuccess);


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
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      width: 120,
      key: 'action',
      render: (_, { id }) => {
        return (
          <Space>
            <Button type="text" size="small" onClick={() => navigate(`/foods/edit/${id}`)}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure?"
              description="Delete entry?"
              onConfirm={() => {
                mutate(id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      }
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

      if (isLoading || isFetching) {
        return <h2>Loading...</h2>;
      }
    
      if (isError) {
        return <h2>{error.message}</h2>;
      }

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
