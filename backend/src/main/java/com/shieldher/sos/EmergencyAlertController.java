package com.shieldher.sos;

import com.shieldher.sos.SosDtos.SosAlertRequest;
import com.shieldher.sos.SosDtos.SosAlertResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sos-alerts")
public class EmergencyAlertController {
  private final EmergencyAlertService service;

  public EmergencyAlertController(EmergencyAlertService service) {
    this.service = service;
  }

  @PostMapping
  SosAlertResponse send(@Valid @RequestBody SosAlertRequest request) {
    return service.send(request);
  }

  @GetMapping
  List<SosAlertResponse> alerts(@RequestParam Long requesterId) {
    return service.adminAlerts(requesterId);
  }
}
