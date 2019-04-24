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

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public String addUser(String name, String email, String password) {
        if (existsByUsername(name)) {
            return "username exists.";
        } else {
            try {
                User user = new User();
                user.setEmail(email);
                user.setUsername(name);
                user.setPassword(password);
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
}
