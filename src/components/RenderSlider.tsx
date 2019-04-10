import React from 'react';
import { Slider } from 'antd';
import { RenderField } from './RenderField';
import { WrappedFieldProps } from 'redux-form';

interface CustomFieldProps {
  min: number;
  max: number;
  label: string;
  marks: {[key: number]: {style: any, label: string}};
  defaultMarkValue: number;
  included: boolean;
}

export type IField = WrappedFieldProps & CustomFieldProps;

const renderSlider = RenderField((props: IField) => {
  const { input: {onChange}, defaultMarkValue, ...rest } = props;
  return <Slider defaultValue={defaultMarkValue} onAfterChange={onChange} {...rest} />
});

export default renderSlider;