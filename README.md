# Calculator API

A RESTful API for performing mathematical calculations, from basic arithmetic to advanced mathematical operations.

## Features

- Basic arithmetic operations
- (Future) Scientific calculator functions
- (Future) Advanced mathematical operations

## Technologies

- Java 17
- Spring Boot 3.1.x
- Maven

## Getting Started

### Prerequisites

- JDK 17+
- Maven 3.6+

### Running the application locally

```bash
mvn spring-boot:run
```

The application will be available at [http://localhost:8080/api](http://localhost:8080/api)

API documentation (Swagger UI) will be available at [http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html)

## API Documentation

The API documentation is generated using Springdoc OpenAPI and can be accessed at:
- OpenAPI specification: `/api/api-docs`
- Swagger UI: `/api/swagger-ui.html`

## API Usage Examples

### Evaluate an expression

```http
POST /api/calculator/evaluate
Content-Type: application/json

{
  "expression": "(3 + 5) * 2 / (7 - 2)"
}
```

Response:

```json
{
  "expression": "(3 + 5) * 2 / (7 - 2)",
  "result": 3.2,
  "formattedResult": "3.2",
  "success": true,
  "errorMessage": null
}
```

### Add two numbers

```http
GET /api/calculator/add?a=5&b=3
```

Response:

```json
{
  "expression": "5.0 + 3.0",
  "result": 8.0,
  "formattedResult": "8.0",
  "success": true,
  "errorMessage": null
}
```
