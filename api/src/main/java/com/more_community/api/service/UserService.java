package com.more_community.api.service;

import com.more_community.api.entity.User;
import com.more_community.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return (List<User>) userRepository.findAll();
    }

    public Optional<User> getById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(Long userId) {
        userRepository.deleteById(userId);
    }
}
