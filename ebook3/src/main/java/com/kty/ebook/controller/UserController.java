package com.kty.ebook.controller;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.User;
import com.kty.ebook.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 *
 * User控制层
 */
@Api(description = "用户接口")
@Controller
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @ApiOperation(value = "用户注册", notes = "用户注册")
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> signup(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        String name = param.getString("username");
        String email = param.getString("email");
        String password = param.getString("password");
        String result = userService.addUser(name, email, password);
        JSONObject ret = new JSONObject();
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ApiOperation(value = "用户登录", notes = "用户登录")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> signin(@RequestBody String request){
        JSONObject param = JSONObject.parseObject(request);
        String name = param.getString("username");
        String password = param.getString("password");
        JSONObject ret = new JSONObject();
        User user = userService.findUserByName(name);
        if (user == null) {
            ret.put("msg","user not exists");
        } else if (!user.getPassword().equals(password)) {
            ret.put("msg","password wrong!");
        } else if (user.getIsBanned()) {
            ret.put("msg", "this account has been banned!");
        } else {
            ret.put("_id", user.getId());
            ret.put("isManager", user.getIsManager());
            ret.put("username", user.getUsername());
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ApiOperation(value = "显示用户", notes = "显示所有用户")
    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> showUsers(@RequestBody String request){
        JSONObject ret = new JSONObject();
        List<User> users = userService.findAllUsers();
        if (users == null) {
            ret.put("msg", "no user.");
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);

        } else {
            ret.put("users",users);
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
    }

    @ApiOperation(value = "禁用用户", notes = "管理员禁用用户")
    @RequestMapping(value = "/ban", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> banUser(@RequestBody String request){
        JSONObject ret = new JSONObject();
        JSONObject param = JSONObject.parseObject(request);
        long id = param.getLongValue("_id");
        String result = userService.banUser(id);
        ret.put("msg", result);
        if (!result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
        } else {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
    }
}
