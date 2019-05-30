package com.kty.ebook.service;

import com.kty.ebook.entity.User;

import java.util.List;

public interface UserService {
    public User findUserByName(String name);
    public List<User> findAllUsers();
    public boolean isManagerById(long id);
    public String addUser(String name, String email, String password, String code);
    public String banUser(long id);
    public String activate(String code);

}
