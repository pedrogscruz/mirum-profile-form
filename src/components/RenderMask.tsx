import * as React from 'react';
import { RenderField } from './RenderField';
import InputMask from 'react-input-mask';
import { Input } from 'antd';
import { WrappedFieldProps } from 'redux-form';

interface CustomFieldProps {
  mask: string;
}

export type IField = WrappedFieldProps & CustomFieldProps;

const RenderMask = RenderField((props: IField) => {
  const { input, mask } = props;
  return (
    <InputMask value={''} mask={mask} {...input}>
      {(maskProps: any) => <Input {...maskProps} disabled={maskProps.disabled ? maskProps.disabled : null} />}
    </InputMask >
  );
});

export default RenderMask;