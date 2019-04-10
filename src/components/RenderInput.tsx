import * as React from 'react';
import { RenderField, IField } from './RenderField';
import { Input } from 'antd';

const renderInput = RenderField((props: IField) => {
  const { input, label } = props;
  return <Input {...input} placeholder={label} />
});

export default renderInput;