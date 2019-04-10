import React, {Fragment} from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Alert, Row, Col, Typography } from 'antd';
const { Title } = Typography;

interface CustomFieldProps {
  name: string;
  label: string;
  children?: Element;
  mask?: string;
  min?: number;
  max?: number;
  type?: string;
  message?: string;
  marks?: {[key: number]: {style: any, label: string}};
  defaultMarkValue?: number;
}

export type IField = WrappedFieldProps & CustomFieldProps;

const DemoBox = (props: {value: string, children: Element}) => <p className={`height-${props.value}`}>{props.children}</p>;

const RenderField = (render: Function) => (props: IField) => {
  const { input, meta: { touched, error, active }, label, ...rest } = props;
  const validatedError = touched && error;

  return (
    <Fragment>
      <Row>
        <Col span={8}><Title></Title>{label}</Col>
        <Col span={16}>{render({input, label, ...rest})}</Col>
      </Row>
      {validatedError && <Alert {...error} />}
    </Fragment>
  )
}

export { RenderField };