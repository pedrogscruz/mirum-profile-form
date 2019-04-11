import React from 'react';
import { Field } from 'redux-form';
import { css } from 'aphrodite';
import { StyleSheet } from 'aphrodite';

import { Input, Select } from 'antd';
const Option = Select.Option;

import { RenderField, IField } from './RenderField';
import RenderWithCondition from './RenderWithCondition';

const classes = (quantity:number) => StyleSheet.create({
	grid: {
		width: '100%',
		display: 'inline-grid',
		gridColumnGap: '16px',
		gridTemplateColumns: '1fr '.repeat(quantity).slice(0, -1)
	}
});

const renderInput = ({input}: any) => <Input {...input} autoComplete={"off"} />,
renderSelect = ({input, options}: any) => (
	<Select {...input} >
		{options.map(({value, label}:any, index: number) => <Option key={`option${index}`} value={value}>{label}</Option>)}
	</Select>
);

const renderObjectInput = RenderField((props: IField) => {
  const { input, keys, grid } = props;
  return ( keys &&
		<div {...grid && { className: css(classes(keys.length).grid) }}>
			{keys.map(({type, name, ...rest}, index) => (
				rest.condition ?
					<Field
						key={index}
						name={input.name+'.'+name}
						render={type==='select'?renderSelect:renderInput}
						component={RenderWithCondition}
						{...rest}
					/>
				:
					<Field
						key={index}
						name={input.name+'.'+name}
						component={type==='select'?renderSelect:renderInput}
						{...rest}
					/>
			))}
		</div>
	)
});

export default renderObjectInput;