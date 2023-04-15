FROM maven:3.9.0-eclipse-temurin-19 as build
COPY ["api/src", "/home/app/src"]
COPY ["api/pom.xml", "/home/app"]

RUN mvn -DskipTests -f /home/app/pom.xml clean package

FROM openjdk:19-jdk-alpine
WORKDIR /usr/local/app
COPY --from=build /home/app/target/api-0.0.1-SNAPSHOT.jar app.jar
CMD java -jar ./app.jar