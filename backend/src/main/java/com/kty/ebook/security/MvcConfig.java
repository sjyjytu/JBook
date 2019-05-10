package com.kty.ebook.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport ;

@Configuration
public class MvcConfig extends WebMvcConfigurationSupport  {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/login")
                .allowedOrigins("http://www.ketianya.xyz:8080")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true).maxAge(3600);
        registry.addMapping("/logout")
                .allowedOrigins("http://www.ketianya.xyz:8080")
                .allowedMethods("GET")
                .allowedHeaders("*")
                .allowCredentials(true).maxAge(3600);
        registry.addMapping("/**")
                .allowedOrigins("http://www.ketianya.xyz:8080")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true).maxAge(3600);
    }
}
