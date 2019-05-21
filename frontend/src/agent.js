var axios = require("axios");
axios.defaults.withCredentials = true;
//const superagent = axios;

const RootUrl = 'http://localhost:8080';
// const RootUrl = 'http://47.103.0.246:8080';

function resBody(res) {
    return res.data;
}

const requests = {
    get: (url)=>axios.get(RootUrl+url,{withCredentials:true}).then(resBody),
    getWith:(url,body)=>axios.get(RootUrl+url,{params: body},{withCredentials:true}).then(resBody),
    post:(url,body)=>axios.post(RootUrl+url,body,{withCredentials:true}).then(resBody),
    delete:(url,body)=>axios.delete(RootUrl+url,body,{withCredentials:true}).then(resBody),
    put:(url,body)=>axios.put(RootUrl+url,body,{withCredentials:true}).then(resBody)
};

//show books, add to cart, manage books and remove a book from cart
export const Book = {
    showBooks: (start,num)=>requests.getWith('/api/book/show',{"num":parseInt(num),"start":parseInt(start)}),
    addToCart: (_id, bookname, num, isbn) => requests.post("/api/cart/add",{"_id":parseInt(_id),"bookname":bookname, "num": num, "isbn": isbn}),
    removeFromCart: (_id, bookname, isbn) => requests.delete("/api/cart/remove",{
        "_id": parseInt(_id),
        "bookname": bookname,
        "isbn": isbn
    }),
    showCart: (_id) => requests.getWith("/api/cart/show",{"_id": _id}),
    getBookByisbn: (isbn,start,num) => requests.getWith('/api/book/showBy',{"isbn": parseInt(isbn),"num":num,"start":start}),
    getBookByName: (bookname,start,num) => requests.getWith("/api/book/showBy",{"bookname": bookname,"num":num,"start":start, "isbn": -1}),
};

//the action of manager add a book, delete a book, update a book, ban a user
export const Manage = {
    addABook: (/*bookname, stockNum, summary, pictureUrl, author, price*/book) => requests.post("/api/book/manage/add",
        /*{
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price
        }*/book),
    deleteABook: (_id, bookname, isbn) => requests.delete("/api/book/manage/delete",{"bookname": bookname, "_id": _id, "isbn": isbn}),
    updateABook: (/*bookname, stockNum, summary, pictureUrl, author, price, isbn*/book) => requests.put("/api/book/manage/update",
        /*{
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price, "isbn": isbn
        }*/book),
    banAUser: _id => requests.put("/api/user/ban",{"_id": _id}),
    showUsers: () => requests.get("/api/user/show")
};

export const Order = {
    showOrder: _id => {return requests.getWith("/api/order/show",{"_id": _id})},
    generateAnOrder: (_id, booksArr, mode) => requests.post("/api/order/generate", {"_id": _id, "books": booksArr, "mode": mode}),
    showStatistics: (_id, startTime,endTime) => requests.getWith("/api/order/show/statistics/buy", {"_id":_id,"startTime":startTime,"endTime":endTime})
};

//
export const User = {
    login: (username, password) => requests.post('/login',{"username":username, "password": password}),
    signup: (username, password, email) => requests.post('/api/user/signup',{"username":username, "password": password,
        "email": email})
};

export const Comment = {
    showComment: (isbn) => requests.getWith("/api/comment/show",{"isbn":isbn}),
    addComment: (isbn, userId, indexArr, username, comment_content) => requests.post("/api/comment/add",
        {
            "isbn":parseInt(isbn),
            "userId":parseInt(userId),
            "index":indexArr,
            "username":username,
            "content":comment_content
        })
};