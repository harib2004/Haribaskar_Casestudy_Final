package com.hexaware.cozyhaven.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hexaware.cozyhaven.filter.JwtFilter;
import com.hexaware.cozyhaven.service.HotelUserDetailService;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter authFilter;

    @Bean
    public UserDetailsService userDetailsService() {
        return new HotelUserDetailService();
    }

    @Bean
    public SecurityFilterChain getSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
        		.cors(cors -> cors.configurationSource(request -> {
                    var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(java.util.List.of("http://localhost:5173"));
                    corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfiguration.setAllowedHeaders(java.util.List.of("*"));
                    corsConfiguration.setAllowCredentials(true);
                    return corsConfiguration;
                }))
        		.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                		//PUBLIC ENDPOINTS
                        .requestMatchers("/api/users/register", "/api/users/login" , "/api/v1/images/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/hotels/all", "/api/hotels/search/**", "/api/hotels/{hotelId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/rooms/all", "/api/rooms/hotel/**", "/api/rooms/availability/**").permitAll()
                        //USER ENDPOINTS
                        .requestMatchers("/api/bookings/create", "/api/bookings/calculate-total", "/api/bookings/user/**", "/api/bookings/cancel/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/payments/make", "/api/payments/booking/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/users/{userId}").authenticated() 
                        .requestMatchers(HttpMethod.PUT, "/api/users/update/{userId}").authenticated()

                        //OWNER ENDPOINTS
                        .requestMatchers("/api/hotels/add", "/api/hotels/update/**", "/api/hotels/delete/**", "/api/hotels/owner-search/**").hasAnyRole("OWNER", "ADMIN")
                        .requestMatchers("/api/rooms/add/**", "/api/rooms/addmultiple", "/api/rooms/update/**", "/api/rooms/delete/**").hasAnyRole("OWNER", "ADMIN")
                        .requestMatchers("/api/bookings/hotel/**").hasAnyRole("OWNER", "ADMIN")
//                        .requestMatchers("/api/v1/images/**").hasRole("HOTEL_OWNER") // Or .permitAll() for now

                        //ADMIN ENDPOINTS
                        .requestMatchers("/api/users/all", "/api/users/delete/**").hasRole("ADMIN")
                        .requestMatchers("/api/payments/getall", "/api/bookings/all").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
            
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
            
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService());
        
        
        provider.setPasswordEncoder(passwordEncoder());
        
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}