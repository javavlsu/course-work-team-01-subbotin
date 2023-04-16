package com.more_community.api.middleware;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.QueryResponse;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class IsLoginMiddleware implements HandlerInterceptor {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    //This method is executed before accessing the interface. We only need to write the business logic to verify the login status here to verify the login status before the user calls the specified interface.
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (handler instanceof HandlerMethod) {
            IsLogined isLogined = ((HandlerMethod) handler).getMethodAnnotation(IsLogined.class);

            if (isLogined == null) {
                return true;
            }

            if (!jwtTokenProvider.validateToken(request)) {
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.getWriter().write(convertObjectToJson(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Для данного действия необходимо авторизоваться")));

                return false;
            }

            return true;
        }

        return true;
    }

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }

        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(object);
    }
}
