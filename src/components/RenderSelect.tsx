import React from 'react';
import { RenderField, IField } from './RenderField';
import { Select } from 'antd';

const RenderSelect = RenderField((props: IField) => {
  const { input: { onFocus, ...rest }, children } = props;
  return (
    <Select {...rest}>
      {children}
    </Select>
  );
});

export default RenderSelect;