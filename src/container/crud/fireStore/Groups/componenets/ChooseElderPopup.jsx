import React, { Component} from 'react';
import ElderSearchList from './ElderSearchList';
import onClickOutside from "react-onclickoutside";
import './ChooseElderPopup.css';

class ChooseElderPopup extends Component {

    handleClickOutside = evt => {
        this.timeoutId = setTimeout(() => {
            this.props.setIsPopupOpen(false);
        }, 100);
      };

      componentWillUnmount() {
          if (this.timeoutId) {
              clearTimeout(this.timeoutId);
          }
      }

    render() {
        const { popupPositionX, popupPositionY } = this.props;

        return (
            <div className='choose-elder-popup' style={{top: `${popupPositionY + 34}px`, left: `${popupPositionX - 3}px`}}>
                <div>28 Results</div>
                <ElderSearchList />
            </div>
        )
    }
}

export default onClickOutside(ChooseElderPopup);
