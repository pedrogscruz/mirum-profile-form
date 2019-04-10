import React from 'react';
import { RenderField, IField } from './RenderField';
import { Checkbox } from 'antd';

const RenderSelect = RenderField((props: IField) => {
  const { input, message } = props;
  return (
    <Checkbox {...input}>
      {message}
    </Checkbox>
  );
});

export default RenderSelect;