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
        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Development",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          beareFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: { type: "string", format: "password" },
          },
          required: ["username", "email", "password"],
        },
        CurrentUser: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                _id: { type: "string", example: "68795d5a300cd48fe444282f" },
                username: { type: "string", example: "John Doe" },
                email: { type: "string", format: "email" },
              },
            },
          },
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
          required: ["email", "password"],
        },
        ResetLink: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
          },
        },
        ResetPassword: {
          type: "object",
          properties: {
            password: { type: "string" },
          },
        },
        Task: {
          type: "object",
          properties: {
            _id: { type: "string", example: "68796c69d6ae759da20bc288" },
            name: { type: "string", example: "Wash the dishes" },
            completed: { type: "boolean", default: false },
            user_id: { type: "string", example: "68795d5a300cd48fe444282f" },
            __v: { type: "integer", example: 0 },
          },
        },
        TaskInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Wash the dishes" },
          },
          required: ["name"],
        },
        TaskArrayResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Fetched all tasks successfully",
            },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        TaskSingleResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        TaskDeletedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Task deleted successfully" },
          },
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function setUpSwagger(app) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = setUpSwagger;
