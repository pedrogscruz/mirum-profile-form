import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Form, Alert } from 'antd';

interface CustomFieldProps {
  name: string;
  fieldName?:string;
  grid?: boolean;
  keys?: Array<{
    type: string,
    name: string,
    options?: Array<{value: string, label: string}>,
    condition?: {function: Function, action: {[key: string]: any}}
  }>;
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
  const { input, meta: { pristine, touched, error }, label, ...rest } = props;

  return (
    <Form.Item {...label ? {label} : {wrapperCol: {xs: {span: 24, offset: 0}, sm: {span: 20, offset: 4}}}} >
      {render({input, label, ...rest})}
      {(!pristine || touched) && error && <Alert {...error} />}
    </Form.Item>
  )
}

export { RenderField };