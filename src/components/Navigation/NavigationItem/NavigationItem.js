import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
      <NavLink 
         to={props.link}
         exact={props.exact}
         activeClassName={classes.active}> {props.children} </NavLink>
    </li>
);

export default navigationItem;

/*className={props.active ? classes.active : null} // auto managed by NavLink*/ 