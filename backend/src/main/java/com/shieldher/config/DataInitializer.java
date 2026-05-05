package com.shieldher.config;

import com.shieldher.user.SafetyUser;
import com.shieldher.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  CommandLineRunner seedAdmin(UserRepository users, PasswordEncoder encoder) {
    return args -> {
      if (users.existsByEmailIgnoreCase("admin@shieldher.local")) {
        return;
      }

      SafetyUser admin = new SafetyUser();
      admin.setRole("ADMIN");
      admin.setName("ShieldHer Admin");
      admin.setEmail("admin@shieldher.local");
      admin.setPhone("9999999999");
      admin.setAddress("Command Center");
      admin.setCity("ShieldHer HQ");
      admin.setPinCode("000000");
      admin.setEmergencyName("Security Desk");
      admin.setEmergencyPhone("8888888888");
      admin.setSafeWord("Admin profile");
      admin.setPasswordHash(encoder.encode("Admin@123"));
      users.save(admin);
    };
  }
}
