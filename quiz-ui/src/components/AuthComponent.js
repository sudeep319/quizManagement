import React  from 'react';
import { withRouter } from 'react-router';
import * as Cookie from "js-cookie";
export default function requireAuth(Component) {
class AuthenticatedComponent extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   auth: Cookie.get('auth')
  }
 }
 componentDidMount() {
  this.checkAuth();
 }
 checkAuth() {
  const location = this.props.location;
  const role = localStorage.getItem("role")
  console.log(location)
  const redirect = location.pathname + location.search;
  if ( ! Cookie.get('auth')) {
   this.props.history.push(`/login?redirect=${redirect}`);
  }
  if((location.pathname==='/admin-dashboard' ||location.pathname==='/test-details')&& role !=='admin'){
    this.props.history.push(`/user-dashboard`); 
  }
 }
render() {
  return Cookie.get('auth')
   ? <Component { ...this.props } />
   : null;
  }
 }
 return  withRouter(AuthenticatedComponent)
}