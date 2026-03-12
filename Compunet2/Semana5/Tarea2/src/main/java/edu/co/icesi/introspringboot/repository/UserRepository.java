package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {


    // 11 usuario por su nombre de user
    Optional<User> findUserByUsername(String username);

    // 12 usuarios que tengan un rol específico por nombre
    List<User> findByUserRoles_Role_Name(String userRolesRoleName);

    //14 usuarios que tengan un permiso
    List<User> findByUserRoles_Role_RolePermissions_Permission_Name(String permissionName);

}
