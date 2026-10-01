# Note Management API (JWT Authenticated)

A lightweight Express + MongoDB notes API where notes are automatically bound to the authenticated user via their JWT token.

## Steps Taken to Reach the Final Solution

Rejected URL-Based IDs (Prevented IDOR): Decided against passing user IDs in route paths (like /notes/:userId) so users cannot forge requests or post notes to someone else's account.

Fixed Scope Collision: Removed duplicate createNote function declarations between note-routes.js and note-controllers.js, keeping routes clean and logic in the controller.

Mounted Base Route Once: Mounted app.use('/api/notes', noteRoutes) in server.js instead of repeating prefixes in individual endpoints.

Configured Postman Bearer Auth: Grabbed the JWT from /api/auth/login and passed it into the Authorization: Bearer <token> header, sending only title and content in the body.

Fixed Schema Validation (user path error): Resolved Path 'user' is required by reading req.user._id from the decoded token and assigning it to the schema's required user field.

## What This Project Successfully Demonstrates

Stateless Token Authentication: Verifying incoming requests securely using JSON Web Tokens (JWT) through dedicated Express middleware.

IDOR Prevention & Secure Resource Association: Enforcing record ownership implicitly from cryptographically verified claims rather than untrusted client inputs.

Separation of Concerns: Maintaining clean modular boundaries between routing definitions, controller business logic, data models, and authentication middleware.

Mongoose Relational Integrity: Enforcing strict schema validation and referencing foreign key records (ObjectId ref to the User collection).

API Testing & Authorization Workflows: Managing authenticated bearer token workflows and crafting minimal JSON payloads via Postman.
