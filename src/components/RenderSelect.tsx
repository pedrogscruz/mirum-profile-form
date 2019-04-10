import React from 'react';
import { RenderField, IField } from './RenderField';
import { Select } from 'antd';

const RenderSelect = RenderField((props: IField) => {
  const { input: {onChange}, children } = props;
  return (
    <Select onChange={onChange}>
      {children}
    </Select>
  );
});

export default RenderSelect;