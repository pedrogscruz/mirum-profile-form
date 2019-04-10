import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import isValidEmail from 'sane-email-validation';
import { RouteComponentProps } from 'react-router-dom';
import { css } from 'aphrodite';
import { Row, Col } from 'antd'

import classes from './FormStyles';
import RenderInput from '../components/RenderInput';
import RenderSlider from '../components/RenderSlider';
import RenderMask from '../components/RenderMask';
import RenderSelect from '../components/RenderSelect';
import RenderInterests from '../components/RenderInterests';
import RenderCheck from '../components/RenderCheck';

type IForm = {
  firstName: string;
  idade: number;
  members: Array<any>;
}

interface IErrors {
  [key: string]: {type: string, message: string} | undefined;
}

const validate = (values:IForm) => {
  let errors:IErrors = {};
  if (!values.firstName)
    errors.nome = {type: 'warning', message: 'Campo obrigatório'};
  return errors;
}

class Form extends React.Component<RouteComponentProps> {
  
  redirectToProfile = () => this.props.history.push('/profile');

  Form = (props: InjectedFormProps<IForm>) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
      <form onSubmit={handleSubmit(this.redirectToProfile)}>
        <Field
          name="firstName"
          type="text"
          label="Nome"
          component={RenderInput}
        />
        <Field
          min={0}
          max={3}
          name="age"
          label="Idade"
          defaultMarkValue={0}
          marks={{
            0: {style: {}, label: '13-19'},
            1: {style: {}, label: '20-29'},
            2: {style: {}, label: '30-35'},
            3: {style: {}, label: '45 e acima'}
          }}
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
          name="country"
          label="País"
          component={RenderSelect}
        >
          
        </Field>
        <RenderInterests name="interests" label="" />
        <Field
          name="news"
          mask="Desejo receber novidade por e-mail"
          component={RenderCheck}
        />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  };

  ReduxForm = reduxForm({
    form: 'fieldArrays',
    destroyOnUnmount: false,
    validate
  })(this.Form);

  render() {
    return(
      <Row>
        <Col span={14} offset={5}>
          <this.ReduxForm />
        </Col>
      </Row>
    )
  }
}

export default Form;