import React from 'react';

function CustomizedComponent(props: any) {
  console.log('刷新2');
  return (
    <div>
      {props.user.age}
    </div>
  )
}

function comparator(prevProps, nextProps) {
  if(prevProps.user.name === nextProps.user.name && prevProps.user.age === nextProps.user.age) {
    return true;
  }
  return false;
}

const memo = React.memo(CustomizedComponent, comparator)

export default memo;