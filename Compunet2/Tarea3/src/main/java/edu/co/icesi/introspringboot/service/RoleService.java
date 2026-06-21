package edu.co.icesi.introspringboot.service;

import edu.co.icesi.introspringboot.entity.Role;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleService {

    Role save(Role role);

    List<Role> findAll();

    Optional<Role> findById(Integer id);

    Optional<Role> findByPublicId(UUID publicId);

    void deleteById(Integer id);
}
