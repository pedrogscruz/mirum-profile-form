import React from 'react';
import { Tag } from 'antd';

const renderTag = (props: any) => {
  const { input, meta, ...rest } = props;
  return <Tag {...input} {...rest}>{input.value}</Tag>
};

export default renderTag;