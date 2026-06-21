package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByPublicId(UUID publicId);

    boolean existsByPublicId(UUID publicId);

    boolean existsByUsername(String username);
}
