package edu.co.icesi.introspringboot.service;

import edu.co.icesi.introspringboot.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

    User save(User user);

    List<User> findAll();

    Optional<User> findById(Integer id);

    Optional<User> findByPublicId(UUID publicId);

    void deleteById(Integer id);

    User findByUsername(String username);
}
