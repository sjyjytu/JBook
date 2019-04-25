package com.kty.ebook.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Orders;
import com.kty.ebook.service.OrdersService;
import com.kty.ebook.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(description = "订单接口")
@Controller
@RequestMapping(value = "/api/order")
@CrossOrigin
public class OrdersController {
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private UserService userService;

    @ApiOperation(value = "获取订单", notes = "根据id判断身份，显示当前用户订单或所有用户订单")
    @RequestMapping(value = "/show",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam(name = "_id") String id){
        //JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        //long userId = Long.parseLong(param.getString("_id"));
        long userId = Long.parseLong(id);
        boolean isManager = userService.isManagerById(userId);
        List<Orders> orders;
        if (isManager) {
            orders = ordersService.findAll();
        } else {
            orders = ordersService.findOrdersByUserId(userId);
        }
        if(null != orders && orders.size()>0) {
            ret.put("orders", orders);
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            ret.put("msg","no order.");
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "生成订单", notes = "根据直接购买/清空购物车来生成订单")
    @RequestMapping(value = "/generate",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> generate(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        long userId = Long.parseLong(param.getString("_id"));
        JSONArray books = param.getJSONArray("books");
        String mode = param.getString("mode");
        String result = "";
        if (mode.equals("buy directly")) {
            result = ordersService.generate(userId, books,false);
        } else {
            result = ordersService.generate(userId, books,true);
        }

        if(result.equals("ok")) {
            ret.put("msg", result);
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            ret.put("msg",result);
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "统计数据", notes = "根据身份某时间段显示书籍销量和用户消费或用户购买的书籍情况")
    @RequestMapping(value = "/show/statistics/buy",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> statistics(@RequestParam(name = "_id") String id, @RequestParam(name = "startTime") String startTime,@RequestParam(name = "endTime") String endTime){
        //JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        //long userId = Long.parseLong(param.getString("_id"));
        //String startTime = param.getString("startTime");
        //String endTime = param.getString("endTime");
        long userId = Long.parseLong(id);
        boolean isManager = userService.isManagerById(userId);
        if (isManager) {
            ret = ordersService.statisticsByUserByManager(startTime, endTime);

        } else {
            ret = ordersService.statisticsByUser(userId, startTime, endTime);
        }
        if(!ret.containsKey("msg")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
