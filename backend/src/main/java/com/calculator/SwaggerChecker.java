package com.calculator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class SwaggerChecker implements CommandLineRunner {

    private final Environment env;

    public SwaggerChecker(Environment env) {
        this.env = env;
    }

    @Override
    public void run(String... args) {
        String port = env.getProperty("server.port", "8080");
        System.out.println("✅ Swagger UI should be available at:");
        System.out.println(
            "➡️  http://localhost:" + port + "/api/swagger-ui/index.html"
        );
    }
}
