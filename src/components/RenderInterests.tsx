import React, { Fragment } from 'react';
import { Field, FieldArray, WrappedFieldArrayProps, GenericFieldArray } from 'redux-form';
import { Input, Icon, Tag } from 'antd';
import RenderTag from '../components/RenderTag';

type IFieldArray = {
  name: string;
}
const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any> & {component: Element};

class renderMembers extends React.Component<WrappedFieldArrayProps<string>> {
  state = {
    newInterest: '',
    interests: new Array,
    inputVisible: false
  }
  
  inputRef: Input | null = null;

  constructor (props: WrappedFieldArrayProps<string>) {
    super(props);
  }


  handleInputConfirm = () => {
    const { fields } = this.props;
    const { newInterest, interests } = this.state;
    if (newInterest && !this.state.interests.includes(newInterest)) {
      fields.push(newInterest);
      interests.push(newInterest);
    }
    this.setState({inputVisible: false});
  };

  render () {
    const { fields } = this.props;
    const { inputVisible } = this.state;
    // const { error, submitFailed } = props.meta;

    return (
      <Fragment>
        {fields.map((interest: any, index: number) => 
          <Field
            closable  
            size="small"
            key={index+interest+this.state.interests[index]}
            name={interest}
            onClose={() => {
              fields.remove(index),
              this.state.interests.splice(index, 1);
            }}
            component={RenderTag}
          />
        )}
        {inputVisible ? (
          <Input
            type="text"
            size="small"
            style={{ width: 78 }}
            ref={(ref) => this.inputRef = ref}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            onChange={({target: {value}}) => this.state.newInterest = value}
          />
        ):(
          <Tag
            onClick={() => this.setState({inputVisible: true}, () => this.inputRef && this.inputRef.focus())}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </Fragment>
    );
  }
}

const FieldArrayComponent = (props: IFieldArray) => <FieldArrayCustom component={renderMembers} {...props} />

export default FieldArrayComponent