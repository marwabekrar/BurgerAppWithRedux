import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  /*state = {
    ingredients:null,
    totalPrice: 0
  }*/
   
  /*componentWillMount() {
    const query= new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      
      if (param[0] === 'price')
        {
          price = +param[1];
        }else{
          //each entry will have this format : ['salad', '1']
          ingredients[param[0]] = +param[1]; 
          // first param [0] is the key in the entry, param[1] is the number but as it is a string we add '+' before the string to convert it to a num  
        }
       
    }
    this.setState({ingredients: ingredients , totalPrice: price});
  }*/
  
  checkoutCancelledHandler = () => {
    
    this.props.history.goBack();
    
  }
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
        {/*<Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData} /> // elle passe pas ingredients comme props, pour resoudre ca , tu dois utiliser render*/}
       {/*<Route 
          path={this.props.match.path + '/contact-data'} 
          component= {ContactData ingredients={this.state.ingredients} 
          price={this.state.totalPrice} {...props} /> )} /> // change it because redux takes care of that*/ }
      <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  };
};



export default connect (mapStateToProps) (Checkout);


