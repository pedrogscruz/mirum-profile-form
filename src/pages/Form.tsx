import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import isValidEmail from 'sane-email-validation';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form as AntForm, Button, Select } from 'antd';
const Option = Select.Option;

import RenderInputFile from '../components/RenderInputFile';
import RenderObjectInput from '../components/RenderObjectInput';
import RenderInput from '../components/RenderInput';
import RenderSlider from '../components/RenderSlider';
import RenderMask from '../components/RenderMask';
import RenderSelect from '../components/RenderSelect';
import RenderInterests from '../components/RenderInterests';
import RenderCheck from '../components/RenderCheck';
import RenderWithCondition from '../components/RenderWithCondition';
import { setFormCopy } from '../actions/formActions';
import { getStates } from '../actions/locationsActions';

export type IForm = {
	photo: string;
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

type locations = Array<{value:string, label: string}>

type IReduxProps = {
	setFormCopy: Function,
	formValues: {[key: string]: any},
	getStates: Function,
	countries: locations,
	states: locations
}

const warningRequired = {type: 'error', message: 'Campo obrigatório'};

const validate = (values:IForm) => {
  let { photo, name, email, phone, address, state, country, news } = values;
	let errors:any = {};
	if (!photo)
    errors.photo = warningRequired;
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

const renderOptions = (array: locations) => array.map(({value, label}, index) => <Option key={value+index} value={value}>{label}</Option>)

let Form:any = (props: RouteComponentProps & InjectedFormProps<IForm> & IReduxProps) => {
	const { handleSubmit, change, reset, history, setFormCopy, formValues, getStates, countries, states, initialValues } = props;
	console.log(initialValues);
	let redirectToProfile = () => {
    setFormCopy(formValues);
    reset();
    history.push('/profile');
	},
	handleCountryChange = (value: any) => {
    change('state', '');
    change('country', value);
    getStates();
	};
	return (
		<AntForm
			onSubmit={handleSubmit(redirectToProfile)}
			labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
			wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
		>
			<Field
				name="photo"
				label="Foto"
				component={RenderInputFile}
			/>
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
				{renderOptions(states)}
			</Field>
			<Field
				label="País"
				name="country"
				component={RenderSelect}
				onChange={handleCountryChange}
			>
				<Option value={''}></Option>
				{renderOptions(countries)}
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


Form = reduxForm({
	form: 'fieldArrays',
	enableReinitialize: true,
	destroyOnUnmount: true,
	validate,
})(Form);

const mapStateToProps = (state: any) => {
	let formValues = {};
	const { form, formCopy: {formInitialValues}, locations: {countries, states} } = state;
	if (form.fieldArrays)
		formValues = form.fieldArrays.values;
	return {formValues, initialValues: formInitialValues, countries, states} // pull initial values from account reducer
}
Form = connect(mapStateToProps, {setFormCopy, getStates})(Form);

export default withRouter(Form);