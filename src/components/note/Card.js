import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from './style';
import { Cards } from '../cards/frame/cards-frame';
import { Dropdown } from '../dropdown/dropdown';
import { Bullet } from '../../container/note/style';
import { noteDeleteData, onLabelUpdate } from '../../redux/note/actionCreator';

const NoteCard = ({ data, labels }) => {
  const dispatch = useDispatch();
  const { noteData } = useSelector(state => {
    return {
      noteData: state.Note.data,
    };
  });
  const onLabelChange = label => {
    dispatch(onLabelUpdate(noteData, data, label));
  };
  const content = (
    <>
      <div className="nav-labels">
        <ul>
          {labels.map(_ => {
            return (
              <li>
                <Link onClick={() => onLabelChange(_)} to="#">
                  <Bullet className={_} /> {_}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
  const onHandleDelete = () => {
    dispatch(noteDeleteData(noteData, data));
  };
  return (
    <Card className={data.label}>
      <Cards headless>
        <h4>
          {data.title}
          <span className={`status-bullet ${data.label}`} />
        </h4>
        <p>{data.description}</p>
        <div className="actions">
          <span>
            <Link onClick={() => onHandleDelete()} to="#">
              <FeatherIcon icon="trash-2" size={16} />
            </Link>
          </span>
          <Dropdown content={content}>
            <Link to="#">
              <FeatherIcon icon="more-vertical" size={16} />
            </Link>
          </Dropdown>
        </div>
      </Cards>
    </Card>
  );
};

NoteCard.propTypes = {
  data: PropTypes.object,
};
export default NoteCard;
