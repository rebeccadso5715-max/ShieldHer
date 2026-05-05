package com.shieldher.sos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyAlertRepository extends JpaRepository<EmergencyAlert, Long> {
  List<EmergencyAlert> findAllByOrderByCreatedAtDesc();
}
