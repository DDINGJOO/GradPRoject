package com.example.graduation.Auth.Auth2;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @RequestMapping("/auth2/login")
    public String login(){
        return "login";
    }

}
