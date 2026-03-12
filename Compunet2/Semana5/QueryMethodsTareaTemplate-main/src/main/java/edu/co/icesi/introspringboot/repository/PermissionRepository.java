package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Permission;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PermissionRepository extends CrudRepository<Permission, Integer> {
    
    List<Permission> findByRolePermissions_Role_UserRoles_User_Username(String name);

    List<Permission> findByRolePermissions_UserRoles_User_Username(String ana);
}
