module.exports = (validate) => {
  return (req, res, next) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    next();
  };
};

// -----------------------------------------------------------------------------
// Explanation of the Function:
// ----------------------------------------------------------------------------

// 1. **What It Is**:
//    - This is a middleware function generator for Express.js.
//    - It takes a `validate` function as an argument, which is responsible for
//      validating the request body (e.g., using a library like Joi).
//    - The middleware ensures that the request body meets the required validation
//      criteria before proceeding to the next middleware or route handler.

// 2. **How It Works**:
//    - The outer function `(validate)` accepts a validation function.
//    - The inner function `(req, res, next)` is the actual middleware that Express
//      will use in the request-response cycle.
//    - It calls the `validate` function with `req.body` to perform validation.
//    - If validation fails (`error` is returned), it sends a `400 Bad Request`
//      response with the validation error message.
//    - If validation passes, it calls `next()` to pass control to the next middleware
//      or route handler.

// 3. **What It Solves**:
//    - **DRY Principle**: Avoids repeating validation logic in every route handler.
//    - **Centralized Validation**: Keeps all validation logic in one place, making
//      it easier to maintain and update.
//    - **Consistent Error Handling**: Ensures that all validation errors are handled
//      in a uniform way across the application.
//    - **Cleaner Code**: Keeps route handlers focused on their primary purpose
//      (processing requests and sending responses) without cluttering them with
//      validation logic.

// 4. **Example Use Case**:
//    - You can use this middleware to validate incoming data for specific routes.
//    - For example, if you have a route that requires a user object with specific
//      fields, you can define a validation schema and pass it to this middleware.

// 5. **Example Usage**:
//    ```javascript
//    const express = require('express');
//    const validate = require('./middleware/validate');
//    const Joi = require('joi');
//
//    const app = express();
//    app.use(express.json());
//
//    // Define a Joi schema for validation
//    const schema = Joi.object({
//        name: Joi.string().min(3).required(),
///        age: Joi.number().integer().min(0).required(),
///    });
//
//    // Use the middleware for validation
//    app.post('/users', validate((body) => schema.validate(body)), (req, res) => {
//        res.send('User is valid!');
//    });
//
//    app.listen(3000, () => console.log('Server running on port 3000'));
//    ```
