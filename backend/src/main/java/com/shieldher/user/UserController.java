package com.shieldher.user;

import com.shieldher.user.dto.AuthDtos.LoginRequest;
import com.shieldher.user.dto.AuthDtos.RegisterRequest;
import com.shieldher.user.dto.AuthDtos.UserResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
  private final UserService service;

  public UserController(UserService service) {
    this.service = service;
  }

  @PostMapping("/auth/register")
  UserResponse register(@Valid @RequestBody RegisterRequest request) {
    return service.register(request);
  }

  @PostMapping("/auth/login")
  UserResponse login(@Valid @RequestBody LoginRequest request) {
    return service.login(request);
  }

  @GetMapping("/profiles")
  List<UserResponse> profiles(@RequestParam Long requesterId) {
    return service.visibleProfiles(requesterId);
  }
}
