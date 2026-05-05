package com.shieldher.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuthDtos {
  public record RegisterRequest(
      @NotBlank(message = "Name is required.")
      @Pattern(regexp = "^[A-Za-z ]+$", message = "Name can include letters and spaces only.")
      String name,

      @NotBlank(message = "Email is required.")
      @Email(message = "Enter a valid email.")
      String email,

      @NotBlank(message = "Phone number is required.")
      @Pattern(regexp = "^\\d{10}$", message = "Phone number must be exactly 10 digits.")
      String phone,

      @NotBlank(message = "Address is required.")
      @Size(min = 10, max = 600, message = "Address must be 10 to 600 characters.")
      String address,

      @NotBlank(message = "City is required.")
      String city,

      @NotBlank(message = "PIN code is required.")
      @Pattern(regexp = "^\\d{6}$", message = "PIN code must be exactly 6 digits.")
      String pinCode,

      @NotBlank(message = "Emergency contact name is required.")
      String emergencyName,

      @NotBlank(message = "Emergency phone is required.")
      @Pattern(regexp = "^\\d{10}$", message = "Emergency phone must be exactly 10 digits.")
      String emergencyPhone,

      @NotBlank(message = "Safe word is required.")
      @Size(min = 3, max = 80, message = "Safe word must be 3 to 80 characters.")
      String safeWord,

      @NotBlank(message = "Password is required.")
      @Pattern(
          regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$",
          message = "Use 8+ chars with uppercase, lowercase, number, and symbol.")
      String password) {}

  public record LoginRequest(
      @NotBlank(message = "Email is required.")
      @Email(message = "Enter a valid email.")
      String email,

      @NotBlank(message = "Password is required.")
      String password) {}

  public record UserResponse(
      Long id,
      String role,
      String name,
      String email,
      String phone,
      String address,
      String city,
      String pinCode,
      String emergencyName,
      String emergencyPhone,
      String safeWord) {}
}
