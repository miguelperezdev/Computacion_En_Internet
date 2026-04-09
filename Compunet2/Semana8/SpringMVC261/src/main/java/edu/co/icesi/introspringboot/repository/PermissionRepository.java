package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    List<Permission> findByRolePermissions_Role_UserRoles_User_Username(String username);

}
