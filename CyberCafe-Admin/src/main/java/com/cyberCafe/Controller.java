package com.cyberCafe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    private String username;

    @Autowired
    private WebSocketService webSocketService;

    @GetMapping("userLogout/{username}")
    public UserLogoutResponse UserLogout(@PathVariable("username") String username){
        this.username=username;
        webSocketService.sendMessage("request");
        UserLogoutResponse userLogoutResponse = new UserLogoutResponse("userLogout" + username);
        return userLogoutResponse;
    }

    @GetMapping("userLogout")
    public Map<String,String> UserLogout(){
        Map<String,String> response = new HashMap<>();
        response.put("status",this.username);
        return response;
    }

}
