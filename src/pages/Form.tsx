import React from 'react';
import axios, { AxiosResponse } from 'axios'
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import isValidEmail from 'sane-email-validation';
import { RouteComponentProps } from 'react-router-dom';
import { css } from 'aphrodite';
import { Form as AntForm, Button, Select, Row, Col } from 'antd';
const Option = Select.Option;

import classes from './FormStyles';
import RenderObjectInput from '../components/RenderObjectInput';
import RenderInput from '../components/RenderInput';
import RenderSlider from '../components/RenderSlider';
import RenderMask from '../components/RenderMask';
import RenderSelect from '../components/RenderSelect';
import RenderInterests from '../components/RenderInterests';
import RenderCheck from '../components/RenderCheck';
import RenderWithCondition from '../components/RenderWithCondition';

type IForm = {
  name: {first: string, last: string};
  email: string;
  age: number;
  phone: string;
  state: string;
  country: string;
  address: {type: string, description: string};
  interests: Array<string>;
  news: boolean;
}

const warningRequired = {type: 'error', message: 'Campo obrigatório'};

const validate = (values:IForm) => {
  let { name, email, phone, address, state, country, news } = values;
  let errors:any = {};
  if (!name || (name && (!name.first || !name.last)))
    errors.name = warningRequired;
  if (!email)
    errors.email = warningRequired;
  else if (!isValidEmail(email))
    errors.email = {type: 'warning', message: 'Email inválido'};
  if (!phone)
    errors.phone = warningRequired;
  else if (phone.replace(/\D/g,'').length < 10)
    errors.phone = {type: 'warning', message: 'Telefone Inválido'};
  if (address) {
    if (!address.type || address.type === "none")
      errors.address = warningRequired;
    else if (!address.description || address.description.length<15)
      errors.address = {type: 'warning', message: 'Mínimo de 15 caracteres'};
  }
  else
    errors.address = warningRequired;
  if (!country)
    errors.country = warningRequired;
  if (!state)
    errors.state = warningRequired;
  if (!news)
    errors.news = {type: 'error', message: 'Selecione este campo para continuar'};
  return errors;
}

type Options = Array<{value:string, label:string}>
type State = {
  countries: Options;
  states: Options;
  changeFormField: Function | null;
  disableCountry: boolean;
  disableState: boolean;
}


class Form extends React.Component<RouteComponentProps> {

  state: State = {
    countries: new Array,
    states: new Array,
    changeFormField: null,
    disableCountry: false,
    disableState: false,
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(this.formatCoutries);
  }

  formatCoutries = ({data}: AxiosResponse<any>) => {
    this.setState({countries: data.map(({name, alpha2Code}: any) => ({value: alpha2Code, label: name}))})
  }
  
  redirectToProfile = () => this.props.history.push('/profile');

  timeOut = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

  random = (qtd: number) => Math.floor(Math.random() * qtd);

  randomState = (states: Array<any>, index: number) => new Promise( async (resolve) => {
    await this.timeOut(this.random(500)), length = this.random(100);
    let label = '',
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i=0; i<length; i++) {
      let space = this.random(8) === 0;
      label += space?' ':possible.charAt(this.random(possible.length))
    }
    states[index] = {label, value: label.slice(0, 3)};
    resolve();
  });

  getStates = async () => {
    let states = new Array, qntd = this.random(100);
    for (let i=0; i<qntd; i++)
      states.push(this.randomState(states, i));
    await Promise.all(states);
    this.setState({states});
  };
  
  handleCountryChange = (value: any) => {
    let { changeFormField } = this.state;
    if (changeFormField) {
      changeFormField('state', '')
      changeFormField('country', value)
    }
    this.getStates();
  };

  Form = (props: InjectedFormProps<IForm>) => {
    const { handleSubmit, change } = props;
    this.state.changeFormField = change;
    return (
      <AntForm
        onSubmit={handleSubmit(this.redirectToProfile)}
        labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
      >
        <Field
          name='name'
          label="Nome"
          keys={[
            {name: "first", type: "input"},
            {name: "last", type: "input"}
          ]}
          grid={true}
          component={RenderObjectInput}
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
          render={RenderSelect}
          component={RenderWithCondition}
          condition={{
            function: (values: IForm) => !values || !values.country,
            action: { disabled: true }
          }}
        >
          <Option value={''}></Option>
          {this.renderOptions(this.state.states)}
        </Field>
        <Field
          label="País"
          name="country"
          component={RenderSelect}
          onChange={this.handleCountryChange}
        >
          <Option value={''}></Option>
          {this.renderOptions(this.state.countries)}
        </Field>
        <Field
          name="address"
          label="Endereço"
          keys={[
            {name: "type", type: "select", options: [
              {value: "none", label:""}, {value: "home", label:"Casa"},
              {value: "company", label:"Empresa"}
            ]},
            {name: "description", type: "input", condition: {
              function: (values: IForm) => !values || !values.address || values.address.type === "none",
              action: { style: {display: 'none'} }
            }}
          ]}
          component={RenderObjectInput}
        />
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

  renderOptions = (array: Options) => array.map(({value, label}, index) => <Option key={value+index} value={value}>{label}</Option>)

  ReduxForm = reduxForm({
    form: 'fieldArrays',
    destroyOnUnmount: false,
    validate
  })(this.Form);

  render() {
    return(
      <Row className={css(classes.container)} key={JSON.stringify(this.state)}>
        <Col span={14} offset={5}>
          <this.ReduxForm />
        </Col>
      </Row>
    )
  }
}

export default Form;