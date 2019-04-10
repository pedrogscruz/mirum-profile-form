import * as React from 'react';
import { Field, FieldArray, WrappedFieldArrayProps, GenericFieldArray } from 'redux-form';

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

const renderMembers = (props: WrappedFieldArrayProps<string>) => {
  const { fields } = props;
  const { error, submitFailed } = props.meta;

  return (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push('a')}>
          Add Member
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((member, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          />
          <h4>Member #{index + 1}</h4>
          {member}
        </li>
      ))}
    </ul>
  )
}

type IFieldArray = {
  name: string;
  label: string;
}

const FieldArrayComponent = (props: IFieldArray) => <FieldArrayCustom component={renderMembers} {...props} />

export default FieldArrayComponent