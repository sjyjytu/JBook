package com.kty.ebook.service;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Book;
import com.kty.ebook.entity.Orders;
import com.kty.ebook.repository.OrdersRepository;
import com.kty.ebook.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class OrdersServiceImpl implements OrdersService{

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private BookService bookService;

    @Override
    public Orders findOrderById(long orderId) {
        Orders orders = null;
        try {
            orders = ordersRepository.findById(orderId).get();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return orders;
    }

    @Override
    public List<Orders> findOrdersByUserId(long userId) {
        List<Orders> orders = null;
        try {
            orders = ordersRepository.findOrdersByUserId(userId);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return orders;
    }

    @Override
    public JSONObject statisticsByUserByManager(String startTime, String endTime) {
        List<Orders> orders = null;
        JSONObject ret = new JSONObject();
        try {
            Timestamp start = Timestamp.valueOf(startTime);
            Timestamp end = Timestamp.valueOf(endTime);
            orders = ordersRepository.findOrdersByCreateTimeBetween(start, end);
            if (orders == null) {
                throw new Exception("no order at that time.");
            }
            JSONObject bookStatistic = new JSONObject();
            JSONObject userStatistic = new JSONObject();
            for (Orders order : orders) {
                JSONArray books = JSONArray.parseArray(order.getBooks());
//                JSONArray books = order.getBooks();
                String id = String.valueOf(order.getUserId());
                double consume = Double.parseDouble(order.getTotalPrice());
                userStatistic.put(id, userStatistic.getDoubleValue(id)+ consume);
                for (int i = 0; i < books.size(); i++) {
                    JSONObject book = books.getJSONObject(i);
                    String isbn = String.valueOf(book.getLongValue("isbn"));
                    int num = book.getIntValue("num");
                    bookStatistic.put(isbn, bookStatistic.getIntValue(isbn)+ num);
                }
            }
            ret.put("user", userStatistic);
            ret.put("book", bookStatistic);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ret.put("msg", "no order at that time");
        }
        return ret;
    }

    public JSONObject statisticsByUser(long userId, String startTime, String endTime) {
        List<Orders> orders = null;
        JSONObject ret = new JSONObject();
        try {
            Timestamp start = Timestamp.valueOf(startTime);
            Timestamp end = Timestamp.valueOf(endTime);
            orders = ordersRepository.findOrdersByUserIdAndCreateTimeBetween(userId, start, end);
            if (orders == null) {
                throw new Exception("no order at that time.");
            }
            JSONObject bookStatistic = new JSONObject();
            double totalConsume = 0;
            for (Orders order : orders) {
                JSONArray books = JSONArray.parseArray(order.getBooks());
                double consume = Double.parseDouble(order.getTotalPrice());
//                JSONArray books = order.getBooks();
//                bookStatistic.put("totalConsume", bookStatistic.getDoubleValue("totalConsume")+ consume);
                totalConsume += consume;
                for (int i = 0; i < books.size(); i++) {
                    JSONObject book = books.getJSONObject(i);
                    String isbn = String.valueOf(book.getLongValue("isbn"));
                    int num = book.getIntValue("num");
                    bookStatistic.put(isbn, bookStatistic.getIntValue(isbn)+ num);
                }
            }
            ret.put("book", bookStatistic);
            ret.put("totalConsume",totalConsume);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ret.put("msg", "no order at that time");
        }
        return ret;
    }

    @Override
    public List<Orders> findAll() {
        List<Orders> orders = null;
        try {
            orders = Utils.it2List(ordersRepository.findAll());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return orders;
    }

    @Override
    @Transactional
    public String generate(long id, JSONArray books, boolean cleanCart) {
        //先库存减，再清空购物车（如果需要的话），再生成订单
        String errMsg = "";
        double totalPrice = 0;
        for (int i = 0; i < books.size(); i++) {
            JSONObject jobj = books.getJSONObject(i);
            int num = jobj.getIntValue("num");
            long isbn = jobj.getLongValue("isbn");
            Book curBook = bookService.findBookByIsbn(isbn);
            if (curBook == null || curBook.getIsDeleted()) {
                //这本书被删了
                errMsg = "book not found, isbn: "+isbn;
                break;
            }
            if (curBook.getStockNum()<num) {
                //这本书库存不足
                errMsg = "book stockNum not enough, isbn: "+isbn;
                break;
            }
            //ok的，减掉
            totalPrice += num * curBook.getPrice();
            curBook.setStockNum(curBook.getStockNum()-num);
        }

        //看一下有没有报错，如果没有，就清车，生成订单
        if (errMsg.equals("")) {
            if (cleanCart) {
                errMsg = cartService.cleanCar(id);
            }
            //看看清车有没有报错
            if (errMsg.equals("")) {
                //生成订单
                Orders orders = new Orders();
                orders.setBooks(books.toJSONString());
                orders.setUserId(id);
//                orders.setBooks(books);
                orders.setTotalPrice(String.valueOf(totalPrice));
                orders.setCreateTime(new Timestamp(new Date().getTime()));
                ordersRepository.save(orders);
            }
        }
        if (!errMsg.equals("")) {
            //回滚，注意这里不要改成else
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return errMsg;
        }
        return "ok";
    }
}
