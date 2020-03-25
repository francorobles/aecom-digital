import React from 'react';
import List from './components/List/list'
import Details from './components/Details/details'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

export default class App extends React.PureComponent {

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/:id" component={Details} />
        </Switch>
      </BrowserRouter>
    )
  }
};