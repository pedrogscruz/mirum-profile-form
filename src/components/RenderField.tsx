import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Form, Alert } from 'antd';

interface CustomFieldProps {
  name: string;
  label?: string;
  component?: any;
  children?: Element;
  mask?: string;
  min?: number;
  max?: number;
  type?: string;
  message?: string;
  marks?: {[key: number]: string};
  defaultMarkValue?: number;
}

export type IField = WrappedFieldProps & CustomFieldProps;

const RenderField = (render: Function) => (props: IField) => {
  const { input, meta: { touched, error }, label, ...rest } = props;

  return (
    <Form.Item {...label ? {label} : {wrapperCol: {xs: {span: 24, offset: 0}, sm: {span: 20, offset: 4}}}} >
      {render({input, label, ...rest})}
      {touched && error && <Alert {...error} />}
    </Form.Item>
  )
}

export { RenderField };