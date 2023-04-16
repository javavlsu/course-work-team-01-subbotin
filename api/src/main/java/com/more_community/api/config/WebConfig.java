package com.more_community.api.config;

import com.more_community.api.middleware.IsLoginMiddleware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private IsLoginMiddleware isLoginMiddleware;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Custom interceptor, add intercept path and exclude intercept path
        registry.addInterceptor(isLoginMiddleware).addPathPatterns("/**");
    }
}
