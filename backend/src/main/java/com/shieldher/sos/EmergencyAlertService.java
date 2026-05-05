package com.shieldher.sos;

import com.shieldher.sos.SosDtos.SosAlertRequest;
import com.shieldher.sos.SosDtos.SosAlertResponse;
import com.shieldher.user.SafetyUser;
import com.shieldher.user.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EmergencyAlertService {
  private final EmergencyAlertRepository alerts;
  private final UserRepository users;

  public EmergencyAlertService(EmergencyAlertRepository alerts, UserRepository users) {
    this.alerts = alerts;
    this.users = users;
  }

  @Transactional
  public SosAlertResponse send(SosAlertRequest request) {
    SafetyUser user = resolveAlertUser(request.userId());

    EmergencyAlert alert = new EmergencyAlert();
    alert.setUser(user);
    alert.setLatitude(request.latitude());
    alert.setLongitude(request.longitude());
    alert.setAccuracy(request.accuracy());

    return toResponse(alerts.save(alert));
  }

  private SafetyUser resolveAlertUser(Long userId) {
    if (userId != null) {
      return users.findById(userId)
          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User was not found."));
    }

    return users.findByEmailIgnoreCase("public@shieldher.local")
        .orElseGet(() -> {
          SafetyUser visitor = new SafetyUser();
          visitor.setRole("USER");
          visitor.setName("Public Visitor");
          visitor.setEmail("public@shieldher.local");
          visitor.setPhone("0000000000");
          visitor.setAddress("Open access SOS");
          visitor.setCity("Public");
          visitor.setPinCode("000000");
          visitor.setEmergencyName("Emergency Services");
          visitor.setEmergencyPhone("112");
          visitor.setSafeWord("Open access");
          visitor.setPasswordHash("");
          return users.save(visitor);
        });
  }

  @Transactional(readOnly = true)
  public List<SosAlertResponse> adminAlerts(Long requesterId) {
    SafetyUser requester = users.findById(requesterId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required."));

    if (!"ADMIN".equals(requester.getRole())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required.");
    }

    return alerts.findAllByOrderByCreatedAtDesc().stream().map(this::toResponse).toList();
  }

  private SosAlertResponse toResponse(EmergencyAlert alert) {
    SafetyUser user = alert.getUser();
    return new SosAlertResponse(
        alert.getId(),
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getPhone(),
        user.getEmergencyName(),
        user.getEmergencyPhone(),
        alert.getLatitude(),
        alert.getLongitude(),
        alert.getAccuracy(),
        alert.getCreatedAt().toString());
  }
}
