import React from 'react';
import { RenderField, IField } from './RenderField';
import { Input } from 'antd';

const renderInput = RenderField((props: IField) => {
  const { input, label, ...rest } = props;
  return <Input {...input} placeholder={label} {...rest} autoComplete={"off"} />;
});

export default renderInput;