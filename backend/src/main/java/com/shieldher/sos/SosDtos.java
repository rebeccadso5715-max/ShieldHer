package com.shieldher.sos;

import jakarta.validation.constraints.NotNull;

public class SosDtos {
  public record SosAlertRequest(
      Long userId,

      @NotNull(message = "Latitude is required.")
      Double latitude,

      @NotNull(message = "Longitude is required.")
      Double longitude,

      Double accuracy) {}

  public record SosAlertResponse(
      Long id,
      Long userId,
      String userName,
      String userEmail,
      String userPhone,
      String emergencyName,
      String emergencyPhone,
      Double latitude,
      Double longitude,
      Double accuracy,
      String createdAt) {}
}
