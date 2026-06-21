package edu.co.icesi.introspringboot.controller;

import edu.co.icesi.introspringboot.entity.*;
import edu.co.icesi.introspringboot.entity.keys.RolePermissionId;
import edu.co.icesi.introspringboot.entity.keys.UserRoleId;
import edu.co.icesi.introspringboot.repository.PermissionRepository;
import edu.co.icesi.introspringboot.repository.RoleRepository;
import edu.co.icesi.introspringboot.repository.UserRepository;
import edu.co.icesi.introspringboot.service.RolePermissionService;
import edu.co.icesi.introspringboot.service.UserRoleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRoleService userRoleService;
    private final RolePermissionService rolePermissionService;

    public AdminController(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PermissionRepository permissionRepository,
                           UserRoleService userRoleService,
                           RolePermissionService rolePermissionService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRoleService = userRoleService;
        this.rolePermissionService = rolePermissionService;
    }

    // ─── USUARIOS ────────────────────────────────────────────────────────────

    @GetMapping("/users")
    @Transactional(readOnly = true)
    public String users(Model model) {
        model.addAttribute("users", userRepository.findAll());
        model.addAttribute("roles", roleRepository.findAll());
        return "admin/users";
    }

    @PostMapping("/users/{userPublicId}/assign-role")
    public String assignRole(@PathVariable UUID userPublicId, @RequestParam UUID rolePublicId) {
        User user = userRepository.findByPublicId(userPublicId).orElseThrow();
        Role role = roleRepository.findByPublicId(rolePublicId).orElseThrow();

        UserRoleId id = new UserRoleId();
        id.setUserId(user.getId());
        id.setRoleId(role.getId());

        if (userRoleService.findById(id).isEmpty()) {
            UserRole userRole = new UserRole();
            userRole.setId(id);
            userRole.setUser(user);
            userRole.setRole(role);
            userRoleService.save(userRole);
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{userPublicId}/remove-role")
    public String removeRole(@PathVariable UUID userPublicId, @RequestParam UUID rolePublicId) {
        User user = userRepository.findByPublicId(userPublicId).orElseThrow();
        Role role = roleRepository.findByPublicId(rolePublicId).orElseThrow();

        UserRoleId id = new UserRoleId();
        id.setUserId(user.getId());
        id.setRoleId(role.getId());
        userRoleService.deleteById(id);
        return "redirect:/admin/users";
    }

    // ─── ROLES Y PERMISOS ────────────────────────────────────────────────────

    @GetMapping("/roles")
    @Transactional(readOnly = true)
    public String roles(Model model) {
        model.addAttribute("roles", roleRepository.findAll());
        model.addAttribute("permissions", permissionRepository.findAll());
        return "admin/roles";
    }

    @PostMapping("/roles/{rolePublicId}/assign-permission")
    public String assignPermission(@PathVariable UUID rolePublicId, @RequestParam UUID permissionPublicId) {
        Role role = roleRepository.findByPublicId(rolePublicId).orElseThrow();
        Permission permission = permissionRepository.findByPublicId(permissionPublicId).orElseThrow();

        RolePermissionId id = new RolePermissionId();
        id.setRoleId(role.getId());
        id.setPermissionId(permission.getId());

        if (rolePermissionService.findById(id).isEmpty()) {
            RolePermission rp = new RolePermission();
            rp.setId(id);
            rp.setRole(role);
            rp.setPermission(permission);
            rolePermissionService.save(rp);
        }
        return "redirect:/admin/roles";
    }

    @PostMapping("/roles/{rolePublicId}/remove-permission")
    public String removePermission(@PathVariable UUID rolePublicId, @RequestParam UUID permissionPublicId) {
        Role role = roleRepository.findByPublicId(rolePublicId).orElseThrow();
        Permission permission = permissionRepository.findByPublicId(permissionPublicId).orElseThrow();

        RolePermissionId id = new RolePermissionId();
        id.setRoleId(role.getId());
        id.setPermissionId(permission.getId());
        rolePermissionService.deleteById(id);
        return "redirect:/admin/roles";
    }
}
