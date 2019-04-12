import React from 'react';
import { RenderField, IField } from './RenderField';
import { Checkbox } from 'antd';

const RenderSelect = RenderField((props: IField) => {
  const { input: {value, ...rest}, message } = props;
  return (
    <Checkbox {...rest} {...typeof value === "boolean" && {checked: value}}>
      {message}
    </Checkbox>
  );
});

export default RenderSelect;