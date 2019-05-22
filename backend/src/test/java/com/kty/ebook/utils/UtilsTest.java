package com.kty.ebook.utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class UtilsTest {
    @Test
    public void testUtils() {
        boolean result = Utils.sendMail("1332372004@qq.com", "test");
        System.out.println(result);
    }
}