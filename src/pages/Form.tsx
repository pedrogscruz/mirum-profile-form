import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import isValidEmail from 'sane-email-validation';
import { RouteComponentProps } from 'react-router-dom';
import { css } from 'aphrodite';
import { Form as AntForm, Button, Row, Col } from 'antd';

import classes from './FormStyles';
import RenderInput from '../components/RenderInput';
import RenderSlider from '../components/RenderSlider';
import RenderMask from '../components/RenderMask';
import RenderSelect from '../components/RenderSelect';
import RenderInterests from '../components/RenderInterests';
import RenderCheck from '../components/RenderCheck';

type IForm = {
  firstName: string;
  age: number;
  members: Array<any>;
}

interface IErrors {
  [key: string]: {type: string, message: string} | undefined;
}

const validate = (values:IForm) => {
  let errors:IErrors = {};
  console.log(values);
  if (!values.firstName)
    errors.firstName = {type: 'warning', message: 'Campo obrigatório'};
  console.log(errors);
  return errors;
}

class Form extends React.Component<RouteComponentProps> {
  
  redirectToProfile = () => this.props.history.push('/profile');

  Form = (props: InjectedFormProps<IForm>) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
      <AntForm
        onSubmit={handleSubmit(this.redirectToProfile)}
        labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
      >
        <Field
          name="firstName"
          type="text"
          label="Nome"
          component={RenderInput}
        />
        <Field
          min={0}
          max={3}
          name='age'
          label='Idade'
          defaultMarkValue={0}
          marks={{
            0: '13-19',
            1: '20-29',
            2: '30-35',
            3: '45 e acima'
          }}
          included={false}
          tooltipVisible={false}
          component={RenderSlider}
        />
        <Field
          name="email"
          type="text"
          label="E-mail"
          component={RenderInput}
        />
        <Field
          name="phone"
          label="Telefone"
          mask="(99) 99999-9999"
          component={RenderMask}
        />
        <Field
          name="state"
          label="Estado"
          component={RenderSelect}
        >

        </Field>
        <Field
          label="País"
          name="country"
          component={RenderSelect}
        >
          
        </Field>
        <AntForm.Item label="Interesses">
          <RenderInterests name="interests" />
        </AntForm.Item>
        <Field
          name="news"
          message="Desejo receber novidade por e-mail"
          component={RenderCheck}
        />
        <AntForm.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 20, offset: 4}}}>
          <Button type="primary" htmlType="submit">Salvar</Button>
        </AntForm.Item>
        {/* <Button disabled={pristine || submitting} onClick={reset}>Clear Values</button> */}
      </AntForm>
    )
  };

  ReduxForm = reduxForm({
    form: 'fieldArrays',
    destroyOnUnmount: false,
    validate
  })(this.Form);

  render() {
    return(
      <Row className={css(classes.container)}>
        <Col span={14} offset={5}>
          <this.ReduxForm />
        </Col>
      </Row>
    )
  }
}

export default Form;