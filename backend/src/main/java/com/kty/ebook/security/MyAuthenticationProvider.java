/*package com.kty.ebook.security;

import com.kty.ebook.entity.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    MyUserDetailService myUserDetailService;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        String username = token.getName();
        String password = token.getCredentials().toString();
        SecurityUser securityUser = (SecurityUser) myUserDetailService.loadUserByUsername(username);
        if (securityUser == null) {
            throw new UsernameNotFoundException("找不到该用户");
        }
        if (!securityUser.getPassword().equals(password)) {
            throw new UsernameNotFoundException("密码错误");
        }
        return new UsernamePasswordAuthenticationToken(securityUser, securityUser.getPassword(), securityUser.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}*/
