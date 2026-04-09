package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
