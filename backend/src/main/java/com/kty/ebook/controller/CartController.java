package com.kty.ebook.controller;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Cart;
import com.kty.ebook.service.CartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 *
 * User控制层
 */
@Api(description = "购物车接口")
@Controller
@RequestMapping(value = "api/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;

    @ApiOperation(value = "显示购物车", notes = "显示购物车")
    @RequestMapping(value = "/show",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        String id = param.getString("_id");
        Cart cart = cartService.findCartById(Integer.parseInt(id));
        if(null != cart && !cart.getBooks().equals("")) {
            ret.put("books",JSONObject.parse(cart.getBooks()));
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            ret.put("msg","no book.");
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @ApiOperation(value = "添加到购物车", notes = "添加到购物车")
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> add(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        long id = param.getLongValue("_id");
        int num = param.getIntValue("num");
        int isbn = param.getIntValue("ISBN");
        String bookname = param.getString("bookname");
        String result = cartService.addBook(id, bookname, num, isbn);
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ApiOperation(value = "从购物车移除", notes = "从购物车移除")
    @RequestMapping(value = "/remove",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<JSONObject> remove(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        JSONObject ret = new JSONObject();
        long id = param.getLongValue("_id");
        int isbn = param.getIntValue("ISBN");
        String bookname = param.getString("bookname");
        String result = cartService.removeBook(id, bookname, isbn);
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
