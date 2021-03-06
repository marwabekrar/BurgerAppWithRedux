import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
  /*constructor(props){
    super(props);
 
  }*/
  state = {
    purchasing: false, 
    loading: false,
    error: null
  };

componentDidMount () {
  /*axios.get('https://react-my-burger-64e45.firebaseio.com/ingredients.json')
    .then(response => {
        this.setState({ ingredients: response.data});
    })
    .catch(error => {
        this.setState({error: true});
  }); */
}

updatePurchaseState (ingredients) {
  /*const ingredients = {
    ...this.state.ingredients   ///didn`t work because we get an old copy of ingredients, only after the second click, the button order is enabled which is wrong
  };*/
  const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
  return  sum > 0;
  
}

purchaseHandler = () => {
  this.setState({purchasing: true});
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
  
  this.props.history.push('/checkout');
 
  /*const queryParams = [];
  for (let i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  }
  queryParams.push('price=' + this.state.totalPrice)
  const queryString = queryParams.join('&');
  this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString
    });*/
  
}
  
render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0 ; //true or false
    }
  let orderSummary = null;
  let burger = this.state.error ? <p> Ingredients cant be loaded </p> : <Spinner />;
  if(this.props.ings) {
      burger =  (
            <Aux> 
              <Burger ingredients={this.props.ings} />
              <BuildControls 
                  ingredientAdded={this.props.onIngredientAdded} 
                  ingredientRemoved={this.props.onIngredientRemoved} 
                  disabled={disabledInfo}
                  price={this.props.price}
                  purchasable={this.updatePurchaseState(this.props.ings)} 
                  ordered={this.purchaseHandler}/>
            </Aux>
        );
      orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}/>
      }
       if (this.state.loading) {
        orderSummary = <Spinner />;
      }
  
  
    return (
      <Aux>
      <Modal show={this.state.purchasing}  modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
      </Modal>
        {burger}
      </Aux> 
    );
  }
}
  
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
  }
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
}      
  
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
  
  
  
  
  