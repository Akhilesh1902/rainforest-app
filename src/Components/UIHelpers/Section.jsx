import React from 'react';

const Fit = (props) => {
  return (
    <div className={`h-full overflow-hidden m-2 ` + props.className}>
      {props.children}
    </div>
  );
};
const Yscroll = (props) => {
  return (
    <div className={`h-full overflow-y-scroll m-2 ` + props.className}>
      {props.children}
    </div>
  );
};
const Xscroll = (props) => {
  return (
    <div className={`h-full overflow-x-scroll m-2 ` + props.className}>
      {props.children}
    </div>
  );
};

export default { Fit, Yscroll, Xscroll };
