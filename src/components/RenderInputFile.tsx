import React, { useState, Fragment } from 'react';
import { RenderField, IField } from './RenderField';
import { Upload, Icon, message, Button } from 'antd';
import { css } from 'aphrodite';
import { StyleSheet } from 'aphrodite';
const classes = StyleSheet.create({
  img: {
    maxWidth: '86px',
    maxHeight: '86px'
  }
});

const beforeUpload = (setLoading: Function, onChange: Function) => (file: any) => {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG)
    message.error('You can only upload JPG file!');
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M)
    message.error('Image must smaller than 2MB!');
  if (!(isJPG && isLt2M))
    return false;
    
  setLoading(true);
  const reader = new FileReader();
  reader.onload = (e: any) => {
    setLoading(false);
    onChange(e.target.result);
  };
  reader.readAsDataURL(file);
  return false;
}

const renderInputFile = RenderField((props: IField) => {
  const { input: {onChange, value, ...inputRest}, label, ...rest } = props;
  const [loading, setLoading] = useState();
  return (
    <Fragment>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload(setLoading, onChange)}
        {...inputRest}
      >
        {value ?
          <img className={css(classes.img)} src={value} alt="avatar" />
        :
          <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
        }
      </Upload>
      {value &&
        <Button icon="delete" onClick={() => {
          onChange('');
        }} />
      }
    </Fragment>
  );
});

export default renderInputFile;