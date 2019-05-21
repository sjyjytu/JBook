package com.kty.ebook.security;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kty.ebook.entity.SecurityUser;
import com.kty.ebook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MyUserDetailService myUserDetailService;
    @Autowired
    private UserService userService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry
//                = http.authorizeRequests();
//        registry.requestMatchers(CorsUtils::isPreFlightRequest).permitAll();
        http
                .authorizeRequests()
                .antMatchers("/api/book/show","/api/book/showBy","/api/user/signup","/api/comment/show").permitAll()
                .antMatchers("/api/user/ban","/api/user/show","/api/book/manage/update","/api/book/manage/add","/api/book/manage/delete").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/api/user/login").permitAll()
                .and()
                .rememberMe()
                .and()
                .logout().logoutUrl("/api/user/logout").permitAll().logoutSuccessHandler(new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                response.setContentType("application/json;charset=utf-8");
                PrintWriter out = response.getWriter();
                out.write(new ObjectMapper().writeValueAsString( "登出成功"));
                out.flush();
                out.close();
            }
        }).and().cors().and().csrf().disable();
        http.addFilterAt(CAFilter(), UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    CustomAuthenticationFilter CAFilter() throws Exception {
        CustomAuthenticationFilter filter = new CustomAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse resp, Authentication authentication) throws IOException, ServletException {
                System.out.println("get here2");
                resp.setContentType("application/json;charset=utf-8");
                PrintWriter out = resp.getWriter();
                SecurityUser user = (SecurityUser)authentication.getPrincipal();
//                System.out.println("pricipal:"+authentication.getPrincipal());
//                System.out.println("authorities:"+authentication.getAuthorities());
//                System.out.println("credential:"+authentication.getCredentials());
//                System.out.println("isAuthenticated:"+authentication.isAuthenticated());
//                System.out.println("detail:"+authentication.getDetails());
                boolean isManager = userService.findUserByName(user.getUsername()).getIsManager();
                JSONObject ret = new JSONObject();
                ret.put("_id", user.getId());
                ret.put("isManager", isManager);
                ret.put("username", user.getUsername());
                out.write(new ObjectMapper().writeValueAsString(ret));
                out.flush();
                out.close();
            }
        });
        filter.setAuthenticationFailureHandler(new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse resp, AuthenticationException e) throws IOException, ServletException {
                resp.setContentType("application/json;charset=utf-8");
                System.out.println(e.getMessage());
                PrintWriter out = resp.getWriter();
                JSONObject ret = new JSONObject();
                if (e.getMessage().equals("User is disabled"))
                    ret.put("msg","此用户已被禁");
                else
                    ret.put("msg", "用户名不存在或密码错误");
                resp.setStatus(503);
                out.write(new ObjectMapper().writeValueAsString(ret));
                out.flush();
                out.close();
            }
        });
        filter.setAuthenticationManager(authenticationManagerBean());
        return filter;
    }
}
