var superagent = require('superagent');

const RootUrl = 'http://localhost:8080';
// const RootUrl = 'http://47.103.0.246:8080';

function resBody(res) {
    return res.body;
}

const request = {
    get: (url)=>superagent.get(RootUrl+url).set('Content-Type','application/json').then(resBody),
    getWith:(url,body)=>superagent.get(RootUrl+url).query(body).then(resBody),
    post:(url,body)=>superagent.post(RootUrl+url).set('Content-Type','application/json').send(body).then(resBody)
};

//show books, add to cart, manage books and remove a book from cart
export const Book = {
    showBooks: (start,num)=>request.getWith('/api/book/show',{"num":parseInt(num),"start":parseInt(start)}),
    addToCart: (_id, bookname, num, isbn) => request.post("/api/cart/add",{"_id":parseInt(_id),"bookname":bookname, "num": num, "isbn": isbn}),
    removeFromCart: (_id, bookname, isbn) => superagent.delete(RootUrl + "/api/cart/remove").set('Content-Type', 'application/json').send({
        "_id": parseInt(_id),
        "bookname": bookname,
        "isbn": isbn
    }).then(resBody),
    showCart: (_id) => request.getWith("/api/cart/show",{"_id": _id}),
    getBookByisbn: (isbn,start,num) => request.getWith('/api/book/showBy',{"isbn": parseInt(isbn),"num":num,"start":start}),
    getBookByName: (bookname,start,num) => request.getWith("/api/book/showBy",{"bookname": bookname,"num":num,"start":start, "isbn": -1}),
};

//the action of manager add a book, delete a book, update a book, ban a user
export const Manage = {
    addABook: (/*bookname, stockNum, summary, pictureUrl, author, price*/book) => request.post("/api/book/manage/add",
        /*{
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price
        }*/book),
    deleteABook: (_id, bookname, isbn) => superagent.delete(RootUrl + "/api/book/manage/delete").set('Content-Type', 'application/json')
        .send({"bookname": bookname, "_id": _id, "isbn": isbn}).then(resBody),
    updateABook: (/*bookname, stockNum, summary, pictureUrl, author, price, isbn*/book) => superagent.put(RootUrl + "/api/book/manage/update")
        .set('Content-Type', 'application/json')
        .send(/*{
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price, "isbn": isbn
        }*/book)
        .then(resBody),
    banAUser: _id => superagent.put(RootUrl + "/api/user/ban").set('Content-Type', 'application/json')
        .send({"_id": _id}).then(resBody),
    showUsers: () => request.get("/api/user/show")
};

export const Order = {
    showOrder: _id => {return request.getWith("/api/order/show",{"_id": _id})},
    generateAnOrder: (_id, booksArr, mode) => request.post("/api/order/generate", {"_id": _id, "books": booksArr, "mode": mode}),
    showStatistics: (_id, startTime,endTime) => request.getWith("/api/order/show/statistics/buy", {"_id":_id,"startTime":startTime,"endTime":endTime})
};

//
export const User = {
    login: (username, password) => request.post('/api/user/login',{"username":username, "password": password}),
    signup: (username, password, email) => request.post('/api/user/signup',{"username":username, "password": password,
        "email": email})
};

export const Comment = {
    showComment: (isbn) => request.getWith("/api/comment/show",{"isbn":isbn}),
    addComment: (isbn, userId, indexArr, username, comment_content) => request.post("/api/comment/add",
        {
            "isbn":parseInt(isbn),
            "userId":parseInt(userId),
            "index":indexArr,
            "username":username,
            "content":comment_content
        })
};