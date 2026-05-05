package com.shieldher.user;

import com.shieldher.user.dto.AuthDtos.LoginRequest;
import com.shieldher.user.dto.AuthDtos.RegisterRequest;
import com.shieldher.user.dto.AuthDtos.UserResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
  private final UserRepository users;
  private final PasswordEncoder encoder;

  public UserService(UserRepository users, PasswordEncoder encoder) {
    this.users = users;
    this.encoder = encoder;
  }

  public UserResponse register(RegisterRequest request) {
    if (users.existsByEmailIgnoreCase(request.email().trim())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "This email already has an account.");
    }

    if (request.phone().equals(request.emergencyPhone())) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Use a different emergency contact number.");
    }

    SafetyUser user = new SafetyUser();
    user.setRole("USER");
    user.setName(request.name().trim());
    user.setEmail(request.email().trim().toLowerCase());
    user.setPhone(request.phone());
    user.setAddress(request.address().trim());
    user.setCity(request.city().trim());
    user.setPinCode(request.pinCode());
    user.setEmergencyName(request.emergencyName().trim());
    user.setEmergencyPhone(request.emergencyPhone());
    user.setSafeWord(request.safeWord().trim());
    user.setPasswordHash(encoder.encode(request.password()));

    return toResponse(users.save(user));
  }

  public UserResponse login(LoginRequest request) {
    SafetyUser user = users.findByEmailIgnoreCase(request.email().trim())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login."));

    if (!encoder.matches(request.password(), user.getPasswordHash())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login.");
    }

    return toResponse(user);
  }

  public List<UserResponse> visibleProfiles(Long requesterId) {
    SafetyUser requester = users.findById(requesterId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required."));

    if ("ADMIN".equals(requester.getRole())) {
      return users.findByRoleNot("ADMIN").stream().map(this::toResponse).toList();
    }

    return List.of(toResponse(requester));
  }

  private UserResponse toResponse(SafetyUser user) {
    return new UserResponse(
        user.getId(),
        user.getRole().toLowerCase(),
        user.getName(),
        user.getEmail(),
        user.getPhone(),
        user.getAddress(),
        user.getCity(),
        user.getPinCode(),
        user.getEmergencyName(),
        user.getEmergencyPhone(),
        user.getSafeWord());
  }
}
