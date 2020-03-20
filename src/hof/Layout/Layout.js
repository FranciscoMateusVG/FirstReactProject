import React, {Component} from 'react';
import classes from './Layout.module.css';
import Aux from '../Aux/Auxiliar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

  state = {
    showSideDrawer:false
  }

  sideDrawerClosedHandler = () => {
    this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer }})
  }

  sideDrawerToggledHandler = () => {
    this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer }})
  }


  render() {

    return (
      <Aux>
        <Toolbar drawerToogleClicked={this.sideDrawerToggledHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
        <footer>Xerox To Xerox Xerox</footer>
      </Aux >)
  }
};

export default Layout;