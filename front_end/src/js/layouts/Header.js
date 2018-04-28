import React from 'react';
import PageHeader from '../components/header/PageHeader';

export default ({ children, ...rest }) => {
  return (
    <div>
      <PageHeader key="pageheader" { ...rest }/>
      { children && <div style={ { margin: '24px 24px 0' } }>{ children }</div> }
    </div>
  )
}
