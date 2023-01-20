import React from 'react';
import { Popconfirm, Table, Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Header from '../../components/header';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

function fetchRecipe() {
    return axios.get(`http://localhost:1337/api/recipes`, {
      params: {
        populate: '*',
      },
    });
  }

  function deleteRecipe(id) {
    return axios.delete(`http://localhost:1337/api/recipes/${id}`);
  }
 
const Recipe = () => {
  const navigate = useNavigate();
    const { mutate } = useMutation(deleteRecipe, {
        onSuccess: () => {
          refetch();
        },
      });

    const { data, refetch } = useQuery('recipes', fetchRecipe, {
        select: (data) => data.data.data.map((game) => game),
      });

    const Columns = [
        { title: 'Id', dataIndex: 'id', key: 'id', width: 30 },
        {
          title: 'Name',
          dataIndex: 'name',
          width: 100
        },
        {
          title: 'Steps',
          dataIndex: 'steps',
          width: 150
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          width: 100,
          key: 'action',
          render: (_, { id }) => {
            return (
              <Space>
                <Button type="text" size="small" onClick={() => navigate(`/recipe/edit/${id}`)}>
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

      const tableData = data?.map(({ id, attributes }) => {
        const { name,steps } = attributes;
        return {
          key: id,
          id,
          name,
          steps
        };
      });

  return (
    <div style={{marginTop:"70px"} }>
      <Header value="Recipe List" link="/add-recipe" />
      <Table
        dataSource={tableData}
        columns={Columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
      />
    </div>
  );
};

export default Recipe;
