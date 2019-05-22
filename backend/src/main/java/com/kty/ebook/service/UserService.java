package com.kty.ebook.service;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.User;
import com.kty.ebook.repository.UserRepository;
import com.kty.ebook.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kty.ebook.utils.Utils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

/**
 *
 * User业务逻辑
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findUserByName(String name) {
        User user = null;
        try {
            user = userRepository.findByUsernameIs(name);
        } catch (Exception e) {
        }
        return user;
    }

    public List<User> findAllUsers() {
        List<User> list = null;
        try {
            Iterable<User> it = userRepository.findAll();
            list = Utils.it2List(it);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return list;
    }

    public boolean isManagerById(long id) {
        User user = null;
        try {
            user = userRepository.findById(id).get();
            if (user != null && user.getIsManager() == true) {
                return true;
            }
        } catch (Exception e) {
        }
        return false;
    }

    public String addUser(String name, String email, String password, String code) {
        if (userRepository.existsByUsernameAndStateIsNot(name, 0)) {
            return "username exists.";
        } else {
            try {
                User user = new User();
                user.setEmail(email);
                user.setUsername(name);
                user.setPassword(password);
                user.setCode(code);
                userRepository.save(user);
                return "ok";
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            return "add user fail";
        }
    }

    public String banUser(long id) {
        if (!userRepository.existsById(id)) {
            return "user does not exist.";
        } else {
            User user = userRepository.findById(id).get();
            user.setIsBanned(!user.getIsBanned());
            userRepository.save(user);
            return "ok";
        }
    }

    public String activate(String code) {
        User user = userRepository.findUserByCodeEquals(code);
        if (user == null) {
            return "认证已过期，请重新发送邮件认证";
        } else {
            if (user.getState() != 0) {
                return "用户已认证，请不要重复认证";
            } else {
                user.setState(1);
                userRepository.save(user);
                return "ok";
            }
        }
    }
}
