# Bank Microservices with API Gateway

This project contains 4 independent Spring Boot Maven projects matching the
lab exercise: Account service, Loan service, Eureka Discovery Server, and an
API Gateway with a global logging filter.

Prerequisites: JDK 17+, Maven 3.6+, an IDE (Eclipse/IntelliJ/VS Code) — no
internet access is needed to build once dependencies are cached, but the
first build of each module will download dependencies from Maven Central.

## Projects

| Folder | Port | Purpose |
|---|---|---|
| `eureka-discovery-server` | 8761 | Service registry |
| `account` | 8080 | `GET /accounts/{number}` |
| `loan` | 8081 | `GET /loans/{number}` |
| `api-gateway` | 9090 | Routes requests to services registered in Eureka, logs every request |

## Build each module

From inside each folder:

```bash
cd eureka-discovery-server
mvn clean package

cd ../account
mvn clean package

cd ../loan
mvn clean package

cd ../api-gateway
mvn clean package
```

Or import all four as separate Maven projects into Eclipse/IntelliJ.

## Run order

Always start the Eureka server first, then the other services (any order),
then the gateway last (though order doesn't strictly matter once eureka
client retry kicks in — starting eureka first just avoids startup warnings).

```bash
# Terminal 1
cd eureka-discovery-server
mvn spring-boot:run

# Terminal 2 (wait until eureka-discovery-server is up)
cd account
mvn spring-boot:run

# Terminal 3
cd loan
mvn spring-boot:run

# Terminal 4
cd api-gateway
mvn spring-boot:run
```

## Verify

1. Open http://localhost:8761 — you should see `ACCOUNT-SERVICE`,
   `LOAN-SERVICE`, and `API-GATEWAY` listed under "Instances currently
   registered with Eureka".
2. Direct service test:
   - http://localhost:8080/accounts/00987987973432
   - http://localhost:8081/loans/H00987987972342
3. Through the API Gateway (this is the point of the exercise — you never
   hit port 8080/8081 directly, everything goes through 9090):
   - http://localhost:9090/account-service/accounts/00987987973432
   - http://localhost:9090/loan-service/loans/H00987987972342
4. Check the console/log output of `api-gateway` — for every request you
   should see a log line from `LogFilter`, e.g.:
   ```
   ====>Request URL http://localhost:9090/account-service/accounts/00987987973432
   ```

## Notes / things that commonly trip people up

- **Don't add `spring-boot-starter-web` to `api-gateway`'s pom.** Spring
  Cloud Gateway is reactive (built on WebFlux/Netty). Mixing it with the
  regular servlet-based `starter-web` will cause the gateway to fail to
  start with a context/`ApplicationContextException`.
- The lab's screenshots use Spring Boot 2.5.5 / an older Eureka annotation
  package. This version uses Spring Boot 3.3.4 + Spring Cloud 2023.0.3
  (Java 17 baseline), which is the current supported combination — the
  annotations (`@EnableEurekaServer`, `@EnableDiscoveryClient`) and property
  keys are unchanged, so the concepts map 1:1 to the lab steps.
- `spring.cloud.gateway.discovery.locator.enabled=true` is what lets the
  gateway auto-create routes named after each registered service, so you
  don't have to hand-write a route per microservice.
- If you get "port already in use", make sure no previous run of the same
  module is still alive (check for stray java processes).
