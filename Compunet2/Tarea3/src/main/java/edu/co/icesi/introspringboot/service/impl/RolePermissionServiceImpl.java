package edu.co.icesi.introspringboot.service.impl;

import edu.co.icesi.introspringboot.entity.RolePermission;
import edu.co.icesi.introspringboot.entity.keys.RolePermissionId;
import edu.co.icesi.introspringboot.repository.RolePermissionRepository;
import edu.co.icesi.introspringboot.service.RolePermissionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {

    private final RolePermissionRepository rolePermissionRepository;

    public RolePermissionServiceImpl(RolePermissionRepository rolePermissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
    }

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public RolePermission save(RolePermission rolePermission) {
        return rolePermissionRepository.save(rolePermission);
    }

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<RolePermission> findAll() {
        return rolePermissionRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Optional<RolePermission> findById(RolePermissionId id) {
        return rolePermissionRepository.findById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteById(RolePermissionId id) {
        rolePermissionRepository.deleteById(id);
    }
}
