import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({form: state.form.fieldArrays ? state.form.fieldArrays.values : {}});

const renderSelectConnect = ({input, condition, form, render, ...rest}: any) => {
	if (condition.function(form))
		Object.keys(condition.action).map((key) => input[key] = condition.action[key])
	else
		Object.keys(condition.action).map((key) => delete input[key])
	return render({input, ...rest});
};

const RenderWithCondition = connect(mapStateToProps)(renderSelectConnect);

export default RenderWithCondition;