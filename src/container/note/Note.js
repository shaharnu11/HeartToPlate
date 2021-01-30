import React, { useState, lazy, Suspense, useLayoutEffect, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';
import { NoteNav, NoteWrapper, Bullet, NoteCardWrap } from './style';
import { BasicFormWrapper, Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Modal } from '../../components/modals/antd-modals';
import { noteAddData, noteGetData } from '../../redux/note/actionCreator';
import NoteCard from '../../components/note/Card';

const { Option } = Select;
const Note = () => {
  const { noteData } = useSelector(state => {
    return {
      noteData: state.Note.data,
    };
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { path } = useRouteMatch();

  const labels = ['personal', 'work'];

  const [labelFilter, setLabelFilter] = useState('all');
  const [filterNoteData, setFilterNoteData] = useState(noteData);
  const [state, setState] = useState({
    visible: false,
    modalType: 'primary',
    checked: [],
    responsive: 0,
    collapsed: false,
  });

  const { responsive, collapsed } = state;

  useEffect(() => {
    if (noteGetData) {
      dispatch(noteGetData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (noteData !== undefined) {
      setFilterNoteData(
        noteData.filter(item => {
          return labelFilter === 'all' ? true : item.label === labelFilter;
        }),
      );
    }
  }, [labelFilter, noteData]);

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const handleOk = values => {
    onCancel();
    dispatch(
      noteAddData(noteData, {
        ...values,
        id: new Date().getTime(),
        time: new Date().getTime(),
      }),
    );
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
  };

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  const collapseSidebar = () => {
    setState({
      ...state,
      collapsed: false,
    });
  };

  const handleFilterLabelClick = filterLabel => {
    setLabelFilter(filterLabel);
  };

  return (
    <>
      <PageHeader ghost title="Note" />

      <Main>
        <NoteWrapper>
          <Row className="justify-content-center" gutter={25}>
            <Col className="trigger-col" xxl={5} xl={7} lg={9} xs={24}>
              {responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  <FeatherIcon icon={collapsed ? 'align-left' : 'align-right'} />
                </Button>
              )}
              {responsive > 991 ? (
                <div className="sidebar-card">
                  <Cards headless>
                    <div className="note-sidebar-top">
                      <Button onClick={showModal} shape="round" type="primary" size="default" block>
                        <FeatherIcon icon="plus" size={18} /> Add Notes
                      </Button>
                    </div>

                    <div className="note-sidebar-bottom">
                      <NoteNav>
                        <ul>
                          <li>
                            <NavLink to="#" onClick={() => handleFilterLabelClick('all')}>
                              <FeatherIcon icon="edit" size={18} />
                              <span className="nav-text">
                                <span>All</span>
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                        <div className="nav-labels">
                          <p>
                            <img src={require('../../static/img/icon/label.png')} alt="icon" /> Labels
                          </p>
                          <ul>
                            {labels.map(_ => {
                              return (
                                <li>
                                  <Link to="#" onClick={() => handleFilterLabelClick(_)}>
                                    <Bullet className={_} /> {_}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </NoteNav>
                    </div>
                  </Cards>
                </div>
              ) : (
                <div className={collapsed ? 'sidebar-card note-sideabr show' : 'sidebar-card note-sideabr hide'}>
                  <Cards headless>
                    <Button
                      type="link"
                      className="mail-sidebar-trigger trigger-close"
                      style={{ marginTop: 0 }}
                      onClick={toggleCollapsed}
                    >
                      <FeatherIcon icon="x" />
                    </Button>
                    <div className="note-sidebar-top">
                      <Button onClick={showModal} shape="round" type="primary" size="default" block>
                        <FeatherIcon icon="plus" size={18} /> Add Notes
                      </Button>
                    </div>

                    <div className="note-sidebar-bottom">
                      <NoteNav>
                        <ul>
                          <li>
                            <NavLink
                              to="#"
                              onClick={() => {
                                collapseSidebar();
                                handleFilterLabelClick('all');
                              }}
                            >
                              <FeatherIcon icon="edit" size={18} />
                              <span className="nav-text">
                                <span>All</span>
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                        <div className="nav-labels">
                          <p>
                            <img src={require('../../static/img/icon/label.png')} alt="icon" /> Labels
                          </p>
                          <ul>
                            {labels.map(_ => {
                              return (
                                <li>
                                  <NavLink to="#" onClick={() => handleFilterLabelClick(_)}>
                                    <Bullet className={_} /> {_}
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </NoteNav>
                    </div>
                  </Cards>
                </div>
              )}
            </Col>
            <Col xxl={19} xl={17} lg={15} xs={24}>
              <Switch>
                <Suspense
                  fallback={
                    <div className="spin">
                      <Spin />
                    </div>
                  }
                >
                  <Cards title="Note Lists">
                    <NoteCardWrap>
                      <Row gutter={24}>
                        {filterNoteData.map(item => {
                          return (
                            <Col xxl={8} xl={12} lg={12} sm={12} xs={24} key={item.key}>
                              <NoteCard data={item} labels={labels} />
                            </Col>
                          );
                        })}
                      </Row>
                    </NoteCardWrap>
                  </Cards>

                  {/* <Route exact path={`${path}/all`} component={All} />
                  <Route path={`${path}/favorite`} component={Favorite} />
                  <Route path={`${path}/personal`} component={Personal} />
                  <Route path={`${path}/work`} component={Work} />
                  <Route path={`${path}/social`} component={Social} />
                  <Route path={`${path}/important`} component={Important} /> */}
                </Suspense>
              </Switch>
            </Col>
          </Row>
        </NoteWrapper>
        <Modal type={state.modalType} title={null} visible={state.visible} footer={null} onCancel={handleCancel}>
          <div className="project-modal">
            <BasicFormWrapper>
              <Form form={form} name="createProject" onFinish={handleOk}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input your note title!' }]}
                  name="title"
                  label="Title"
                >
                  <Input placeholder="Note Title" />
                </Form.Item>

                <Form.Item
                  rules={[{ required: true, message: 'Please input your note description!' }]}
                  name="description"
                  label="Description"
                >
                  <Input.TextArea rows={4} placeholder="Note Description" />
                </Form.Item>
                <Form.Item name="label" initialValue={labels[0]} label="Note Label">
                  <Select style={{ width: '100%' }}>
                    {labels.map(_ => {
                      return <Option value={_}>{_}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Button htmlType="submit" size="default" type="primary" key="submit">
                  Add New Note
                </Button>
              </Form>
            </BasicFormWrapper>
          </div>
        </Modal>
      </Main>
    </>
  );
};

Note.propTypes = {
  // match: PropTypes.shape(PropTypes.object),
};
export default Note;
