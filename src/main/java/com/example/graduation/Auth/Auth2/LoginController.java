package com.example.graduation.Auth.Auth2;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/login/oauth2", produces = "application/json")
public class LoginController {

    LoginService  loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping("/code/google")
    public void googleLogin(@RequestParam String code) {
        loginService.socialLogin(code);
    }
}

/*
https://accounts.google.com/o/oauth2/auth?client_id=993475195222-0kogg3dggt3hrdse5tj1k6ooc2gu06eq.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile

 */