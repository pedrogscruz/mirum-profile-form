import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Upload, Icon, message, Button, Typography  } from 'antd';
const { Text } = Typography;
import { css } from 'aphrodite';

import classes from './ProfileStyles';
import { IForm } from './Form';
import { setInitialValues, setFormCopy, updateFormCopy } from '../actions/formActions';

type IProfile = {
  setInitialValues: Function;
  setFormCopy: Function;
  updateFormCopy: Function;
  formCopy: IForm;
}

class Profile extends Component<IProfile & RouteComponentProps> {
  state = {
    loading: false
  }
  componentWillReceiveProps() {
    this.forceUpdate();
  }
  beforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG)
      message.error('You can only upload JPG file!');
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M)
      message.error('Image must smaller than 2MB!');
    if (!(isJPG && isLt2M))
      return false;
    this.setState({ loading: true });
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.setState({ loading: false })
      this.props.updateFormCopy({photo: e.target.result});
    };
    reader.readAsDataURL(file);
    return false;
  }

  getAgeLabel(age: number) {
    switch (age) {
      case 0:
        return 'entre 13 e 19'
      case 1:
        return 'entre 20 e 29'
      case 1:
        return 'entre 30 e 35'
      case 1:
        return 'mais de 35'
      default:
        return '';
    }
  }

  renderInterests = (interests: Array<string>) => interests && interests.map((item, index) => index+2===interests.length?item:index+1===interests.length?` e ${item}`:`${item}, `)

  handleConfirm = () => axios.post('/fakeUrl', this.props.formCopy);

  handleEdit = () => {
    const { setInitialValues, setFormCopy, formCopy, history } = this.props;
    setInitialValues(formCopy);
    setFormCopy({});
    history.push('/form');
  }

  render() {
    const { formCopy } = this.props;
    const { photo, name, email, age, phone, state, interests } = this.props.formCopy;
    const { loading } = this.state;
    return (
      <Row className={css(classes.container)}>
        <Col span={14} offset={5}>
          {Object.keys(formCopy).length>0 && <Row>
            <Col span={4}>
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
              >
                {photo ?
                  <img className={css(classes.img)} src={photo} alt="avatar" />
                :
                  <div>
                    <Icon type={loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                }
              </Upload>
              {photo &&
                <Button icon="delete" onClick={() => {
                  this.props.updateFormCopy({photo: ''});
                }} />
              }
              <Button onClick={this.handleEdit}>Editar Perfil</Button>
            </Col>
            <Col span={20}>
              <Text>
                Eu sou o <Text code>{name.first}</Text> <Text code>{name.last}</Text> e eu tenho <Text code>{this.getAgeLabel(age)}</Text> e você pode enviar
                e-mails para <Text code>{email}</Text>. Eu moro no estado do <Text code>{state}</Text>. Eu gosto de <Text code>{this.renderInterests(interests)}</Text>.
                Por-favor me envie newsletters. Para me contratar ligue no telefone <Text code>{phone}</Text>
              </Text>
              <Row><Button type="primary" onClick={this.handleConfirm} >Confirmar</Button></Row>
            </Col>
          </Row>}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ formCopy: {formCopy} }:any) => ({formCopy})

export default connect(mapStateToProps, { setInitialValues, setFormCopy, updateFormCopy })(Profile);