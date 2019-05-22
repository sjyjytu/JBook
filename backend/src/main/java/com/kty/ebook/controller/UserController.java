package com.kty.ebook.controller;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.User;
import com.kty.ebook.service.UserService;
import com.kty.ebook.utils.Utils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import com.kty.ebook.utils.Utils.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 *
 * User控制层
 */
@Api(description = "用户接口")
@Controller
@RequestMapping(value = "/api/user")
@CrossOrigin
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
        String code = Utils.randomNumber(20);
        String result = "";
        if (Utils.sendMail(email, code)) {
            result = userService.addUser(name, email, password, code);
        } else {
            result = "邮件发送失败，请稍后再重试";
        }
        JSONObject ret = new JSONObject();
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ApiOperation(value = "注册认证", notes = "注册认证")
    @RequestMapping(value = "/activate", method = RequestMethod.GET)
    public String  writeSubmitHtml(String code, HashMap<String, Object> map) throws IOException {
        String result = userService.activate(code);
        if (result.equals("ok")) {
            map.put("result", "认证成功！");
            map.put("ok", true);
            map.put("href","http://www.ketianya.xyz/JBook/#/login");
        } else {
            map.put("ok", false);
            map.put("result", result);
        }
        return "authen";
    }
    @ApiOperation(value = "用户登录", notes = "用户登录")
    @RequestMapping(value = "/login")
    @ResponseBody
    public ResponseEntity<JSONObject> signin() {
        JSONObject ret = new JSONObject();
        ret.put("msg","请先登录");
        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
    }
//    public ResponseEntity<JSONObject> signin(@RequestBody String request){
//        JSONObject param = JSONObject.parseObject(request);
//        String name = param.getString("username");
//        String password = param.getString("password");
//        JSONObject ret = new JSONObject();
//        User user = userService.findUserByName(name);
//        if (user == null) {
//            ret.put("msg","user not exists");
//        } else if (!user.getPassword().equals(password)) {
//            ret.put("msg","password wrong!");
//        } else if (user.getIsBanned()) {
//            ret.put("msg", "this account has been banned!");
//        } else {
//            ret.put("_id", user.getId());
//            ret.put("isManager", user.getIsManager());
//            ret.put("username", user.getUsername());
//            return new ResponseEntity<>(ret, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);
//    }

    @ApiOperation(value = "显示用户", notes = "显示所有用户")
    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> showUsers(){

        JSONObject ret = new JSONObject();
        List<User> users = userService.findAllUsers();
        if (users == null) {
            ret.put("msg", "no user.");
            return new ResponseEntity<>(ret, HttpStatus.SERVICE_UNAVAILABLE);

        } else {
            List<JSONObject> retUsers = new LinkedList<>();
            for (User user : users) {
                JSONObject retUser = new JSONObject();
                retUser.put("_id", user.getId());
                retUser.put("username", user.getUsername());
                retUser.put("isManager", user.getIsManager());
                retUser.put("isBanned", user.getIsBanned());
                retUsers.add(retUser);
            }
            ret.put("users",retUsers);
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
