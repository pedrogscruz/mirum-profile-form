import * as React from 'react';
import Slider from 'rc-slider';
import { RenderField } from './RenderField';
import { WrappedFieldProps } from 'redux-form';

interface CustomFieldProps {
  min: number;
  max: number;
  label: string;
  marks: {[key: number]: {style: any, label: string}};
  defaultMarkValue: number;
}

export type IField = WrappedFieldProps & CustomFieldProps;

const renderSlider = RenderField((props: IField) => {
  const { input: {onChange}, defaultMarkValue, marks, min, max } = props;
  return <Slider defaultValue={defaultMarkValue} marks={marks} min={min} max={max} onAfterChange={onChange} />
});

export default renderSlider;