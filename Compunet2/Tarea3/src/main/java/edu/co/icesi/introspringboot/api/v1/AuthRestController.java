package edu.co.icesi.introspringboot.api.v1;

import edu.co.icesi.introspringboot.api.v1.dto.AuthRequest;
import edu.co.icesi.introspringboot.api.v1.dto.AuthResponse;
import edu.co.icesi.introspringboot.security.CustomUserDetailService;
import edu.co.icesi.introspringboot.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthRestController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequest authRequest
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        UserDetails appUser = customUserDetailService.loadUserByUsername(
                authRequest.getUsername()
        );
        String token = jwtService.generateToken(appUser);
        return ResponseEntity.status(200).body(new AuthResponse(token));
    }

}
