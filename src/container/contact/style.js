import Styled from 'styled-components';

const Action = Styled.div`
  .active{   
    color: #FA8B0C;    
  }
`;
const ContactPageheaderStyle = Styled.div`
  .ant-page-header-heading-title{
    margin-right: 0;
    padding-right: 0;
    &:after{
      display: none;
    }
  }
  .ant-select .ant-select-selection-search-input{
    border-radius: 6px;
  }
  .ant-page-header-heading-extra{
    padding-right: 90px;
  }
`;
export { Action, ContactPageheaderStyle };
