package com.cognizant.springlearnapp.controller;

import com.cognizant.springlearnapp.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/authenticate")
    public Map<String,String> authenticate(
            @RequestHeader("Authorization") String authHeader){

        LOGGER.info("START");

        LOGGER.debug(authHeader);

        String user=getUser(authHeader);

        String token=jwtUtil.generateToken(user);

        Map<String,String> map=new HashMap<>();

        map.put("token",token);

        LOGGER.info("END");

        return map;
    }

    private String getUser(String authHeader){

        String encoded=authHeader.substring(6);

        byte[] decoded= Base64.getDecoder().decode(encoded);

        String credentials=new String(decoded, StandardCharsets.UTF_8);

        return credentials.split(":")[0];
    }

}