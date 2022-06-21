package com.cyberCafe;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class webSocketConfigurarion implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
       registry.enableSimpleBroker("/topic/");//msg endpoint
       registry.setApplicationDestinationPrefixes("ws");//application endpoint
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //adding server endpoint and allow origins
        registry.addEndpoint("/sba-websocket").setAllowedOrigins("http://localhost:4200", "http://localhost:4200/").withSockJS();
    }


}
