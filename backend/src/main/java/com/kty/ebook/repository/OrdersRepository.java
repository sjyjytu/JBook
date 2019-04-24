package com.kty.ebook.repository;


import com.kty.ebook.entity.Orders;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;


import java.sql.Timestamp;
import java.util.List;

public interface OrdersRepository extends CrudRepository<Orders, Long> {
    List<Orders> findOrdersByUserId(long userId);
    List<Orders> findOrdersByCreateTimeBetween(Timestamp start, Timestamp end);
    List<Orders> findOrdersByUserIdAndCreateTimeBetween(long userId, Timestamp start, Timestamp end);
}
