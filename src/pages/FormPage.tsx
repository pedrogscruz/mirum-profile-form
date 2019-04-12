import React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import { Row, Col } from 'antd';

import classes from './FormStyles';
import { getCountries } from '../actions/locationsActions';
import Form from './Form';

type IForm = {
  getCountries: Function;
}

class FormPage extends React.Component<IForm> {

  componentDidMount() {
    const { getCountries } = this.props;
    getCountries();
  }

  render() {
    return(
      <Row className={css(classes.container)} key={JSON.stringify(this.state)}>
        <Col span={14} offset={5}>
          <Form />
        </Col>
      </Row>
    );
  }
}

export default connect(() => ({}), { getCountries })(FormPage);