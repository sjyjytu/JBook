package com.kty.ebook.repository;

import com.kty.ebook.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsernameIs(String username);
    boolean existsByUsernameAndStateIsNot(String username, int notState);
    User findUserByCodeEquals(String code);
}
