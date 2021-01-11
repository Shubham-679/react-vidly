import {Redirect, Route , Switch} from 'react-router-dom';
import Movies from './components/movies';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Navbar from './components/navbarm';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/registration';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return ( 
    <div>
      <ToastContainer/>
          <Navbar />
      <main className="container">
        <Switch>
        <Route path="/registration" component={Register}/>
        <Route path="/loginform" component={LoginForm}/>
        <Route path="/movies/:id" component={MovieForm}/>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/"  exact to="/movies" />
        <Redirect to="/not-found"/>
        </Switch>
      </main>
      </div>

  );
}

export default App;
