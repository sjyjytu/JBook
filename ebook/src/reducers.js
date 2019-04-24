import {combineReducers} from "redux/es/redux";

function Login(state={_id:'',username:'',isManager:0},action) {
    switch (action.type) {
        case "LOGIN":
            return action.result;
        default:
            return state;
    }
}

function Redirect(state={redirectTo:null},action) {
    switch (action.type) {
        case 'REDIRECTED':
            return {redirectTo: null};
        case 'SIGN_UP':
        case 'ADD_BOOK':
        case 'LOGIN':
        case "UPDATE_BOOK":
            return {redirectTo: '/'};
        default:
            return state;

    }
}

function BookDetail(state={books: [], update:false},action) {
    switch (action.type) {
        case "UPDATE":
            const update = state.update;
            return Object.assign({},{books:state.books, update: !update});
        case "SHOW_BOOK":
            //只存当前页的书
            return Object.assign({},{books: action.result.books,update:state.update});
        case "ADD_BOOK":
            //action.book {"bookname":  ,"stockNum":  , "summary":  ,"pictureUrl":  ,"price":  ,"author":  ,"ISBN":  }
            const newState = Object.assign({}, state);
            newState.books.push(action.book);
            return newState;
        case "DELETE_BOOK":
            //action.ISBN
            const newState2 = Object.assign({}, state);
            for (let i = 0; i < newState2.books.length; i++) {
                if (newState2.books[i].ISBN === action.ISBN) {
                    //cart has this book
                    newState2.books.splice(i, 1);
                    return newState2;
                }
            }
            //cart doesn't have this book
            return state;
        case "UPDATE_BOOK":
            //action.book
            const newState3 = Object.assign({}, state);
            for (let i = 0; i < newState3.books.length; i++) {
                if (newState3.books[i].bookname === action.book.bookname) {
                    //book exits
                    Object.assign(newState3.books[i],action.book);
                    return newState3;
                }
            }
            //book not exit
            return state;
        default:
            return state;
    }
}

function BookAndNum(state={books: []},action) {
    switch (action.type) {
        case "SHOW_CART":
            return {books: action.result.books};
        case "ADD_TO_CART":
            //action.bookname action.num
            const newState = Object.assign({}, state);
            for (let i = 0; i < newState.books.length; i++) {
                if (newState.books[i].ISBN === action.ISBN) {
                    //cart has this book
                    newState.books[i].num += action.num;
                    return newState;
                }
            }
            //cart doesn't have this book
            newState.books.push({"bookname": action.bookname, "num": action.num,"ISBN":action.ISBN});
            return newState;
        case "REMOVE_FROM_CART":
            const nState = Object.assign({}, state);
            //action.ISBN
            for (var i = 0; i < nState.books.length; i++) {
                if (nState.books[i].ISBN === action.ISBN) {
                    //cart has this book
                    nState.books.splice(i, 1);
                    return nState;
                }
            }
            //cart doesn't have this book
            return state;
        default:
            return state;
    }
}

function Order(state={orders:[]},action) {
    switch (action.type) {
        case "SHOW_ORDER":
            //action.result {orders:[{"userId":.....}]}
            return {orders: action.result.orders};
        case "GENERATE_ORDER":
            //action.order {"userId":...}
            const newState = Object.assign({}, state);
            newState.orders.push(action.order);
            return newState;
        default:
            return state;
    }
}

function Page(state={curPage:1, perPageNum: 2, total: 0}, action) {
    switch (action.type) {
        case "NEXT_PAGE":
            return Object.assign({}, state, {curPage: state.curPage + 1});
        case "LAST_PAGE":
            return Object.assign({}, state, {curPage: state.curPage - 1});
        case "RESET_PAGE":
            return Object.assign({}, state, {curPage: 1});
        case "SET_PPN":
            return Object.assign({}, state, {perPageNum: action.PPN});
        case "SET_TOTAL":
            return Object.assign({}, state, {total: action.total});
        default:
            return state;
    }
}

function Search(state={keyWord:'', by: 'ISBN'}, action) {
    switch (action.type) {
        case "SWITCH_BY":
            if (state.by === 'ISBN') {
                return Object.assign({}, state, {by: 'bookname'});
            } else {
                return Object.assign({}, state, {by: 'ISBN'});
            }
        case "SET_KEY":
            const newState = Object.assign({}, state, {keyWord: action.keyWord});
            return newState;
        case "RESET_KEY":
            return Object.assign({}, state, {keyWord: ''});
        default:
            return state;
    }
}

export default combineReducers(
    {Login, Redirect, BookDetail, Order, Page, Search}
);