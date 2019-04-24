package com.kty.ebook.controller;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Book;
import com.kty.ebook.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Api(description = "书籍接口")
@Controller
@RequestMapping(value = "api/book")
@CrossOrigin
public class BookController {
    @Autowired
    private BookService bookService;

    @ApiOperation(value = "获取书籍", notes = "分页获取指定数量的书籍")
    @RequestMapping(value = "/show",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestBody String request){
        System.out.println("Book show called");
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        int start = param.getIntValue("start");
        int num = param.getIntValue("num");
        Page<Book> books = bookService.showBookLimit(start, num);
        if(null != books) {
            ret.put("books", books.getContent());
            ret.put("count", books.getTotalElements());
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            ret.put("msg","no book.");
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "查找书籍", notes = "根据书名或isbn查询书籍")
    @RequestMapping(value = "/showBy",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> showBy(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        int start = param.getIntValue("start");
        int num = param.getIntValue("num");
        long isbn = param.getLongValue("ISBN");
        String bookname = param.getString("bookname");
        if (bookname == null) {
            bookname = "";
        }
        Page<Book> books = bookService.findBookByLimit(isbn, bookname,start, num);
        if(null != books && books.getTotalElements()>0) {
            ret.put("books", books.getContent());
            ret.put("count", books.getTotalElements());
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            ret.put("msg","no book.");
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "添加书籍", notes = "添加书籍")
    @RequestMapping(value = "/manage/add",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> add(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        double price = param.getDoubleValue("price");
        long num = param.getLongValue("stockNum");
        String bookname = param.getString("bookname");
        String summary = param.getString("summary");
        String author = param.getString("author");
        String pictureUrl = param.getString("pictureUrl");
        Book book = new Book(price, bookname, num, summary, pictureUrl, author);
        String result = bookService.addBook(book);
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.BAD_GATEWAY);
    }

    @ApiOperation(value = "删除书籍", notes = "删除书籍")
    @RequestMapping(value = "/manage/delete",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<JSONObject> remove(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        long isbn = param.getLongValue("ISBN");
        //String bookname = param.getString("bookname");
        String result = bookService.deleteBook(isbn);
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.BAD_GATEWAY);
    }

    @ApiOperation(value = "更改书籍", notes = "更改书籍")
    @RequestMapping(value = "/manage/update",method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> update(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        double price = param.getDoubleValue("price");
        long num = param.getLongValue("stockNum");
        String bookname = param.getString("bookname");
        String summary = param.getString("summary");
        String author = param.getString("author");
        String pictureUrl = param.getString("pictureUrl");
        long isbn = param.getLongValue("ISBN");
        Book book = new Book(price, bookname, num, summary, pictureUrl, author);
        book.setIsbn(isbn);
        String result = bookService.updateBook(book);
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.BAD_GATEWAY);
    }
}
