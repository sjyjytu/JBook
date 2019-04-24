package com.kty.ebook.repository;

import org.springframework.data.repository.CrudRepository;
import com.kty.ebook.entity.Cart;
import org.springframework.transaction.annotation.Transactional;

public interface CartRepository extends CrudRepository<Cart, Long>{
    Cart findCartByUserIdIs(long id);
}
