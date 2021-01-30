import React, { useState, useEffect } from 'react';

import { Row, Col, Table, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import PropTypes from 'prop-types';
import { Span, TodoStyleWrapper } from './style';
import { Main, TableWrapper, BasicFormWrapper } from '../styled';
import { Modal } from '../../components/modals/antd-modals';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ToDoAddData, ToDoDeleteData, onStarUpdate, ToDoGetData, onActiveUpdate } from '../../redux/todo/actionCreator';

const ToDo = () => {
  const todoData = useSelector(state => {
    return state.Todo.data;
  });
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: '',
      dataIndex: 'item',
    },
    {
      title: '',
      dataIndex: 'action',
      width: 120,
    },
  ];

  useEffect(() => {
    if (ToDoGetData) {
      dispatch(ToDoGetData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (todoData !== undefined) {
      setSelectedRowKeys(
        todoData
          .map((_, index) => ({ ..._, index }))
          .filter(_ => _.active)
          .map(_ => _.index),
      );
    }
  }, [dispatch, todoData]);

  const onHandleDelete = todo => {
    dispatch(ToDoDeleteData(todoData, todo));
  };

  const dataSource = [];

  if (todoData !== null) {
    todoData.map((item, index) => {
      return dataSource.push({
        key: index,
        index,
        item: (
          <Span className={!item.active ? 'todo-title inactive' : 'todo-title active'}>
            {item.text} -{item.index} -
          </Span>
        ),
        action: (
          <div className="todos-action">
            {/* <DragHandle /> */}
            <Link
              className={item.favorite ? 'star active' : 'star'}
              onClick={() => dispatch(onStarUpdate(todoData, item))}
              to="#"
            >
              <FeatherIcon icon="star" style={{ color: item.favorite ? 'gold' : '#888' }} size={16} />
            </Link>
            <Link onClick={() => onHandleDelete(item)} to="#">
              <FeatherIcon icon="trash-2" size={16} />
            </Link>
          </div>
        ),
      });
    });
  }
  const [form] = Form.useForm();

  const onSelect = selectedRowKey => {
    // onActiveUpdate(selectedRowKey);
    dispatch(onActiveUpdate(todoData, todoData[selectedRowKey.index]));
  };
  // const onSelectChange = selectedRowKey => {
  //   setSelectedRowKeys(selectedRowKey);
  // };
  const rowSelection = {
    onSelect,
    selectedRowKeys,
    // onChange: onSelectChange,
    // selectedRowKeys: [1],
  };

  const onSubmitHandler = values => {
    if (values.text !== '') {
      dispatch(
        ToDoAddData(todoData, {
          ...values,
          id: new Date().getTime(),
          time: new Date().getTime(),
          favorite: false,
          active: true,
        }),
      );
      form.resetFields();
      setModalVisible(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Main>
        <Row gutter={30}>
          <Col md={24}>
            <TodoStyleWrapper>
              <Cards title="Task Lists">
                <TableWrapper className="table-responsive">
                  <Table
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    // rowKey="inde
                  />
                </TableWrapper>
                <div className="new-todo-wrap">
                  <Button onClick={showModal} className="btn-toDoAdd" transparented type="primary" size="large">
                    + Add New Task
                  </Button>
                </div>
              </Cards>
            </TodoStyleWrapper>
          </Col>
        </Row>
        <Modal title="Add New Todo" visible={modalVisible} footer={null} onCancel={handleCancel}>
          <div className="todo-modal">
            <BasicFormWrapper>
              <Form className="adTodo-form" name="todoAdd" form={form} onFinish={onSubmitHandler}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input your todo text!' }]}
                  name="text"
                  label="Text"
                >
                  <Input placeholder="ToDo Text" />
                </Form.Item>

                <br />
                <br />

                <Button onClick={showModal} htmlType="submit" className="btn-adTodo" type="primary" size="large">
                  Add New
                </Button>
              </Form>
            </BasicFormWrapper>
          </div>
        </Modal>
      </Main>
    </>
  );
};

export default ToDo;
