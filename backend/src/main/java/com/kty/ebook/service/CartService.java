package com.kty.ebook.service;

import com.kty.ebook.entity.Cart;

public interface CartService {
    public Cart findCartById(long id);
    public String addBook(long id, String bookname, int num, int isbn);
    public String removeBook(long id, String bookname, int isbn);
    public String cleanCar(long userId);
}
