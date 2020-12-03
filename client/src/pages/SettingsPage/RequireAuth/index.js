import React from 'react'
import { getUser } from '../../../utils/storage';

import LoginForm from '../LoginForm'

const RequireAuth = props => {
  
  if (!getUser()) {
    return <LoginForm {...props}/>
  }
    
  return (props.children);
};

export default RequireAuth;
