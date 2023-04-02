#
# Build stage
#
FROM maven:3.9.0-eclipse-temurin-19
COPY ["api/src", "/home/app/src"]
COPY ["api/pom.xml", "/home/app"]

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres/more_community
ENV POSTGRES_DB=more_community
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=Ituj55@hfll

RUN mvn -f /home/app/pom.xml clean package
#
##
## Package stage
##
#FROM openjdk:19-jdk
#COPY --from=build /home/app/target/api-0.0.1-SNAPSHOT.jar /usr/local/lib/api.jar
#EXPOSE 5000
#ENTRYPOINT ["java","-jar","/usr/local/lib/api.jar"]

#FROM openjdk:19-jdk-alpine
#WORKDIR /usr/local/app
#ADD api-0.0.1-SNAPSHOT.jar app.jar
#CMD java -jar ./app.jar