import {createStore/*,applyMiddleware*/} from "redux";
import Reducers from './reducers';

const store = createStore(Reducers/*, applyMiddleware()*/);

export default store;