import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
  // this could be a functional component, it doesn't have to be a class, we keep it this way just for debugging purposes
  componentWillUpdate(){
    console.log('orderSummary will update');
  }
  
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}> 
            <span style={{textTransformation:'capitalize' }}>
                {igKey}: {this.props.ingredients[igKey]} 
            </span> 
          </li>
        );
      });
    
   return (
        <Aux>
          <h3>Your Order</h3>
          <p>ingredients:</p>
          <ul>
             {ingredientSummary}
          </ul>
          <p><strong> Total Price: {this.props.price.toFixed(2)} </strong></p>
          <p>Continue to Checkout ? </p>
          <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
   ); 
  }
  
}

export default OrderSummary;