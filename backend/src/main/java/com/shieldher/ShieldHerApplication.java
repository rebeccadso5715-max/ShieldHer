package com.shieldher;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShieldHerApplication {
  public static void main(String[] args) {
    configureRenderDatabaseUrl();
    SpringApplication.run(ShieldHerApplication.class, args);
  }

  private static void configureRenderDatabaseUrl() {
    String databaseUrl = System.getenv("DATABASE_URL");
    if (databaseUrl == null || databaseUrl.isBlank()) {
      return;
    }

    URI uri = URI.create(databaseUrl);
    if (!"postgresql".equals(uri.getScheme()) && !"postgres".equals(uri.getScheme())) {
      return;
    }

    String userInfo = uri.getUserInfo() == null ? "" : uri.getUserInfo();
    String[] credentials = userInfo.split(":", 2);
    String username = credentials.length > 0 ? decode(credentials[0]) : "";
    String password = credentials.length > 1 ? decode(credentials[1]) : "";
    String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();

    System.setProperty("spring.datasource.url", jdbcUrl);
    System.setProperty("spring.datasource.username", username);
    System.setProperty("spring.datasource.password", password);
  }

  private static String decode(String value) {
    return URLDecoder.decode(value, StandardCharsets.UTF_8);
  }
}
