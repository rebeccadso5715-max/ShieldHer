package com.shieldher.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<SafetyUser, Long> {
  boolean existsByEmailIgnoreCase(String email);

  Optional<SafetyUser> findByEmailIgnoreCase(String email);

  List<SafetyUser> findByRoleNot(String role);
}
