import React from 'react';

const Row = (props) => {
  return (
    <div className={'flex gap-1 m-2 ' + props.className}>{props.children}</div>
  );
};
const Col = (props) => {
  return (
    <div className={'flex flex-col gap-1 m-2 ' + props.className}>
      {props.children}
    </div>
  );
};

export default { Row, Col };
