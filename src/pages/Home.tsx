import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { css } from 'aphrodite';

import classes from './HomeStyles';

class Home extends Component {
  render() {
    return (
      <Link to='/form' className={css(classes.centralized)}>
        <Button type="primary" icon="form" size={'large'}>Cadastrar</Button>
      </Link>
    );
  }
}

export default Home;