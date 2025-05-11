package com.ipl.dashboard.service;

import com.ipl.dashboard.dto.LoginRequest;
import com.ipl.dashboard.dto.LoginResponse;
import com.ipl.dashboard.dto.RegisterRequest;
import com.ipl.dashboard.model.User;
import com.ipl.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public User register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        
        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole("USER");
        
        return userRepository.save(user);
    }
    
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        User user = userOpt.get();
        
        // In a real application, you would generate a JWT token here
        String token = "dummy-jwt-token-" + System.currentTimeMillis();
        
        return new LoginResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), token);
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public User updateUser(User user) {
        // Don't update password here, create a separate endpoint for that
        Optional<User> existingUserOpt = userRepository.findById(user.getId());
        
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            user.setPassword(existingUser.getPassword()); // Keep the existing password
        }
        
        return userRepository.save(user);
    }
}
