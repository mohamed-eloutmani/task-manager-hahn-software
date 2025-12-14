# ===============================
# STEP 1 — Build stage
# ===============================
FROM maven:3.9.8-eclipse-temurin-17 AS build

WORKDIR /app

# Copy dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy sources
COPY src ./src

# Package application
RUN mvn clean package -DskipTests


# ===============================
# STEP 2 — Run stage
# ===============================
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java","-jar","app.jar"]
