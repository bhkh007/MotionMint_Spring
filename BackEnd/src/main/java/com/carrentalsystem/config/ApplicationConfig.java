package com.carrentalsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.carrentalsystem.interceptor.RequestHeaderInterceptor;


// for interceptor
@Configuration
public class ApplicationConfig implements WebMvcConfigurer {
	
	@Autowired
	private RequestHeaderInterceptor requestHeaderInterceptor;
	
	@Override
	public void addInterceptors(@SuppressWarnings("null") InterceptorRegistry registry) {
		registry.addInterceptor(requestHeaderInterceptor);
	}

}
