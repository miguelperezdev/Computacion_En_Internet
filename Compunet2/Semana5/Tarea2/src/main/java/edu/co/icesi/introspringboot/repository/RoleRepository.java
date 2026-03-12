package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoleRepository extends CrudRepository<Role, Integer> {


    //13
    List<Role> findRoleByNameContainingIgnoreCase(String name);

}
