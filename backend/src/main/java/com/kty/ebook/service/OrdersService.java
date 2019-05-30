package com.kty.ebook.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Orders;

import java.util.List;

public interface OrdersService {
    public Orders findOrderById(long orderId);
    public List<Orders> findOrdersByUserId(long userId);
    public JSONObject statisticsByUserByManager(String startTime, String endTime);
    public JSONObject statisticsByUser(long userId, String startTime, String endTime);
    public List<Orders> findAll();
    public String generate(long id, JSONArray books, boolean cleanCart);

}
