import React from 'react';
import { Slider } from 'antd';
import { RenderField } from './RenderField';
import { WrappedFieldProps } from 'redux-form';

interface CustomFieldProps {
  min: number;
  max: number;
  label: string;
  marks: {[key: number]: {style: any, label: string}};
  included: boolean;
}

export type IField = WrappedFieldProps & CustomFieldProps;

const renderSlider = RenderField((props: IField) => {
  const { input: {value, onChange}, ...rest } = props;
  return <Slider {...typeof value === "number" && {value}} onChange={onChange} {...rest} />
});

export default renderSlider;