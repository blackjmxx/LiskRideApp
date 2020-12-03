import React from 'react'

import { Redirect } from "react-router-dom";
import { getUser } from '../../../utils/storage';

const GlobalRequireAuth = props => {
  if (!getUser()) {
    return (<Redirect to={'/home/params'}/>)
  }
  return (props.children);
};

export default GlobalRequireAuth;
