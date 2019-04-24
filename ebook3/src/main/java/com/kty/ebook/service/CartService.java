package com.kty.ebook.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Cart;
import com.kty.ebook.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart findCartById(long id) {
        Cart cart = null;
        try {
            cart = cartRepository.findCartByUserIdIs(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return cart;
    }

    public String addBook(long id, String bookname, int num, int isbn) {
        Cart cart = findCartById(id);
        if (cart!=null) {
            JSONArray cartJson = JSONObject.parseArray(cart.getBooks());
            boolean haveThisBook = false;
            for (int i = 0; i < cartJson.size(); i++) {
                JSONObject jobj = cartJson.getJSONObject(i);
                if (jobj.getIntValue("ISBN")==isbn) {
                    int newNum = jobj.getInteger("num") + num;
                    jobj.put("num", newNum);
                    haveThisBook = true;
                    break;
                }
            }
            if (!haveThisBook) {
                //车里没有这本书，添加
                JSONObject newBook = new JSONObject();
                newBook.put("bookname", bookname);
                newBook.put("num",num);
                newBook.put("ISBN", isbn);
                cartJson.add(newBook);
            }
            cart.setBooks(cartJson.toJSONString());
            cartRepository.save(cart);
            return "ok";
        } else {
            try {
                cart = new Cart();
                JSONArray cartJson = new JSONArray();
                JSONObject newBook = new JSONObject();
                newBook.put("bookname", bookname);
                newBook.put("num",num);
                newBook.put("ISBN", isbn);
                cartJson.add(newBook);
                cart.setUserId(id);
                cart.setBooks(cartJson.toJSONString());
                cartRepository.save(cart);
                return "ok";
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            return "add to cart fail";
        }
    }

    public String removeBook(long id, String bookname, int isbn) {
        Cart cart = findCartById(id);
        if (cart!=null) {
            JSONArray cartJson = JSONObject.parseArray(cart.getBooks());
            for (int i = 0; i < cartJson.size(); i++) {
                JSONObject jobj = cartJson.getJSONObject(i);
                if (jobj.getIntValue("ISBN")==isbn) {
                    cartJson.remove(i);
                    break;
                }
            }
            if (cartJson.size() <= 0) {
                //从cart中，移除这个用户
                cartRepository.deleteById(id);
            } else {
                cart.setBooks(cartJson.toJSONString());
                cartRepository.save(cart);
            }
            return "ok";
        } else {
            return "no book to remove.";
        }
    }

    public String cleanCar(long userId) {
        try {
            cartRepository.deleteById(userId);
            return "";
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return "clean car fail.";
    }
}
