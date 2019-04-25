import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/Main/HomePage';
import BooksPage from './components/Book/BooksPage';
import BookDetail from "./components/Book/BookDetail";
import ShoppingCart from "./components/Shopping/ShoppingCart";
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddNewBook from './components/Book/AddNewBook';
import UpdateBook from './components/Book/UpdateBook';
import ManageUser from './components/Manage/ManageUser';
import ShowStatistics from './components/Shopping/ShowStatistics';
import ShowOrder from './components/Shopping/ShowOrder';

const BasicRoute = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={/*HomePage*/BooksPage}/>
                <Route exact path="/all-books" component={BooksPage}/>
                <Route exact path="/book/:isbn" component={BookDetail}/>
                <Route exact path="/cart" component={ShoppingCart}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/add-new-book" component={AddNewBook}/>
                <Route exact path="/update/:isbn" component={UpdateBook}/>
                <Route exact path="/manage-users" component={ManageUser}/>
                <Route exact path="/order" component={ShowOrder}/>
                <Route exact path="/statistics" component={ShowStatistics}/>
            </Switch>
        </HashRouter>
    );
};

export default BasicRoute;