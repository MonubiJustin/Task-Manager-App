const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Manger Documentaion",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for the Task Manager application, built with Express and Swagger.",
    },

    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: process.env.NODE_ENV === 'production' ? "Production Server" : "Local Development",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email", example: "user@example.com" },
            password: { type: "string", format: "password"}
          },
          required: ["username", "email", "password"]
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string"}
          },
          required: ["email", "password"]
        },
        ResetLink: {
          type: "object",
          properties: {
            email: { type: "string", format: "email"}
          }
        },
        ResetPassword: {
          type: "object",
          properties: {
            password: { type: "string"}
          }
        }
      }
    }
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function setUpSwagger(app) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = setUpSwagger;
