package com.kty.ebook.utils;

import java.util.ArrayList;
import java.lang.Iterable;
import java.util.List;

public class Utils {
    public static <T> List<T> it2List(Iterable<T> iter) {
        List<T> copy = new ArrayList<T>();
        iter.forEach(it->{copy.add(it);});
        return copy;
    }
}
