package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);

    Optional<Role> findByPublicId(UUID publicId);

    boolean existsByPublicId(UUID publicId);
}
