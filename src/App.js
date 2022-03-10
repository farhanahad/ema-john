import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import OrderReview from './components/OrderReview/OrderReview';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Shop from './components/Shop/Shop';

function App() {
  return (
    <div>
    <Router>
    <Header/>
      <Switch>
        <Route exact path='/'>
          <Shop/>
        </Route>
        <Route  path='/shop'>
          <Shop/>
        </Route>
        <Route  path='/review'>
          <OrderReview/>
        </Route>
        <Route  path='/inventory'>
          <Inventory/>
        </Route>
        <Route path='/placeorder'>
          <PlaceOrder/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
