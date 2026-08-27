> **Shared project guidelines.** Meubelia is split across two repositories —
> `meubelia_back` (Laravel API) and `meubelia_front` (Next.js). This file is a
> copy of the canonical guidelines and must be kept identical in both repos.

# CLAUDE.md — Meubelia E-commerce Platform

## 1. Project Overview

**Meubelia** is a modern international e-commerce platform designed to sell products online to customers globally.

The platform will provide a complete shopping experience, including:

- Product discovery
- Product listing and search
- Product details
- Shopping cart
- Checkout
- Online payments
- Customer accounts
- Customer orders
- Order management
- Administration dashboard
- Product and inventory management

The application should be designed to be:

- Production-ready
- Secure
- Maintainable
- Scalable
- SEO-friendly
- Mobile-first
- Accessible
- Easy to extend

### Important

This file provides the **general project context and technical direction**.

It is **not a complete product specification**.

Pages, features, user flows, business rules, UI requirements, API requirements, and other implementation details will be provided separately during development.

**Do not attempt to build the application based only on this file.**

---

# 2. Core Architecture

Meubelia uses a decoupled frontend/backend architecture.

```text
Frontend
Next.js + React + TypeScript + Tailwind CSS
            │
            │ REST API / HTTP / JSON
            ▼
Backend
Laravel + PHP + Eloquent
            │
            ▼
Database
MySQL

External Services:
- Stripe
- Cloud/Object Storage
- Email provider
```

The frontend and backend have clearly separated responsibilities.

The Laravel backend is the authoritative source for business rules and sensitive operations.

The Next.js frontend is responsible primarily for presentation, user interaction, and consuming the backend API.

---

# 3. Technology Stack

## Backend

Primary technologies:

- Laravel
- PHP
- MySQL
- Eloquent ORM
- REST API
- Laravel validation
- Laravel authentication/authorization
- Laravel queues where appropriate
- Laravel notifications/mail where appropriate
- Laravel filesystem where appropriate

The exact framework/package versions should be determined from the actual repository configuration (`composer.json`, lock files, etc.).

Do not upgrade framework versions or replace major dependencies unless explicitly requested.

### Backend Responsibilities

Laravel is responsible for:

- Business logic
- Database access
- Data validation
- Authentication
- Authorization
- Product/catalog rules
- Inventory/stock rules
- Cart rules
- Order rules
- Payment verification
- Order state management
- Notifications
- API responses
- Security-sensitive operations

The backend is the **source of truth** for business data and business rules.

---

## Frontend

Primary technologies:

- Next.js
- React
- TypeScript
- Tailwind CSS

The frontend uses the Next.js App Router unless the existing project architecture explicitly specifies otherwise.

The exact versions should be determined from the actual repository.

### Frontend Responsibilities

Next.js is responsible for:

- User interface
- Pages
- Layouts
- Components
- Forms
- User interactions
- Responsive design
- SEO-related rendering
- Loading states
- Error states
- Empty states
- Calling the Laravel API
- Customer storefront
- Administration dashboard UI

The frontend must **not become a second backend**.

---

## Database

Primary database:

- MySQL

Laravel migrations and Eloquent should be used for database schema and database interaction.

Database design should prioritize:

- Data integrity
- Correct relationships
- Foreign keys
- Appropriate indexes
- Appropriate constraints
- Query performance
- Maintainability

Do not create database entities simply because they are common in other e-commerce applications.

Create them only when the actual requirements justify them.

---

## Payments

The planned payment provider is:

- Stripe

Stripe will be used for international online payments.

The backend is responsible for authoritative payment state.

The frontend must never be trusted to determine:

- Final order price
- Payment status
- Order status
- Inventory availability
- Discounts
- Authorization

Never store sensitive card information in the application database.

Stripe credentials and webhook secrets must never be exposed to the browser.

---

# 4. Repository Structure

The intended high-level repository structure is:

```text
/
├── frontend/
│   └── Next.js application
│
├── backend/
│   └── Laravel application
│
└── CLAUDE.md
```

The actual repository structure is always authoritative.

Before creating or moving files, inspect the existing structure.

Do not reorganize the repository unnecessarily.

---

# 5. High-Level System Architecture

```text
                    ┌──────────────────────┐
                    │       Customer       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Next.js App      │
                    │ React / TypeScript   │
                    │ Tailwind CSS         │
                    └──────────┬───────────┘
                               │
                        REST API / JSON
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Laravel API       │
                    │ Business Logic       │
                    │ Authentication       │
                    │ Authorization        │
                    │ Validation           │
                    └──────────┬───────────┘
                               │
               ┌───────────────┼────────────────┐
               │               │                │
               ▼               ▼                ▼
             MySQL           Stripe       Cloud Storage
```

Keep these responsibilities separated.

---

# 6. Core Domain

Meubelia is an e-commerce application.

Important domain concepts include:

### Users and Accounts

- Users
- Customers
- Administrators
- Addresses

### Catalog

- Products
- Product images
- Categories
- Inventory/stock
- Product variants if explicitly required

### Shopping

- Shopping carts
- Cart items

### Orders

- Orders
- Order items
- Order statuses

### Payments

- Payments
- Payment transactions
- Stripe webhook events where required

These are **domain concepts**, not automatically database tables or models.

Do not create speculative models, tables, services, or abstractions.

The actual requirements determine what needs to be implemented.

---

# 7. User Roles

The initial platform will support two primary roles.

## Customer

Customers may eventually be able to:

- Browse products
- Search products
- Filter products
- View product details
- Add products to cart
- Modify cart quantities
- Manage addresses
- Checkout
- Make payments
- View orders
- View order details
- Manage their account

Exact capabilities will be defined by the relevant page/feature requirements.

---

## Administrator

Administrators will manage the e-commerce platform.

Potential areas include:

- Products
- Product images
- Categories
- Inventory
- Orders
- Customers
- Payments
- Store settings
- Reporting/statistics

Exact administrator capabilities will be defined later.

Do not implement functionality simply because it is listed as a potential capability.

---

# 8. Backend Development Principles

## Controllers

Controllers should remain thin.

Controllers should primarily:

1. Receive the request.
2. Trigger authorization/validation.
3. Call the appropriate business logic.
4. Return the appropriate response.

Avoid putting complex business workflows directly into controllers.

---

## Validation

Use Laravel's validation mechanisms.

For non-trivial request validation, prefer dedicated `FormRequest` classes.

Frontend validation is for user experience.

Backend validation is authoritative.

Never assume that data received from the frontend is valid.

---

## Authorization

Authorization must always be enforced by Laravel.

Never rely on frontend UI restrictions as security.

For example, hiding an admin button does not prevent an unauthorized user from calling the API directly.

Use Laravel's appropriate authorization mechanisms such as:

- Policies
- Gates
- Middleware
- Role/permission checks where appropriate

---

## Business Logic

Complex business logic should be separated from controllers.

Services or other appropriate domain-oriented structures may be used when they provide real value.

Examples include:

- Checkout
- Order creation
- Inventory operations
- Payment processing
- Order state transitions

Do not create a service class for every trivial operation.

Prefer simple and readable architecture.

---

## Database Transactions

Use database transactions for operations where multiple related database changes must succeed or fail together.

Examples may include:

- Creating an order
- Updating inventory
- Creating order items
- Recording payment state

The exact transaction boundaries should be determined by the business requirements.

---

# 9. API Principles

Laravel exposes a REST API consumed by the Next.js frontend.

API design should prioritize:

- Consistency
- Predictability
- Correct HTTP status codes
- Validation errors
- Authentication errors
- Authorization errors
- Not-found responses
- Server errors
- Pagination where appropriate

Use Laravel API Resources or an equivalent consistent response mechanism where appropriate.

Avoid exposing:

- Passwords
- Authentication secrets
- Payment secrets
- Internal sensitive fields
- Unnecessary database implementation details

### Response Structure

The project should use a consistent JSON response convention.

For example:

```json
{
  "success": true,
  "data": {},
  "message": "Resource retrieved successfully"
}
```

Paginated responses may additionally contain pagination metadata.

Error responses may contain:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": [
      "The email field is required."
    ]
  }
}
```

The exact response contract should be established and kept consistent once API implementation begins.

Do not force unnecessary fields onto responses where they do not make sense.

---

# 10. Frontend Principles

The frontend should follow a modular component architecture.

Prefer:

- Reusable UI components
- Reusable layouts
- Reusable forms
- Strong TypeScript types
- Centralized API communication
- Consistent loading states
- Consistent error handling
- Consistent empty states
- Clear component responsibilities

Avoid:

- Duplicated components
- Duplicated API logic
- Huge components
- Unnecessary global state
- Business logic duplicated from Laravel

---

# 11. Server and Client Components

Next.js Server Components should be the default where appropriate.

Use Client Components only when client-side behavior requires them, such as:

- User interaction
- Browser APIs
- Local interactive state
- Client-side event handlers
- Interactive forms
- Other functionality that genuinely requires the client

Do not add `"use client"` unnecessarily.

The correct rendering strategy should be determined based on each page's actual requirements.

---

# 12. API Communication

The frontend communicates with Laravel through the defined REST API.

API communication should be centralized and consistent.

Avoid scattering raw API calls throughout unrelated UI components.

Use appropriate abstractions for:

- Requests
- Authentication
- Error handling
- Serialization
- Response parsing
- Type definitions

The exact data-fetching strategy should be chosen based on the requirements of each feature.

Do not introduce a state-management or data-fetching library unless there is a clear benefit.

---

# 13. SEO

SEO is important because Meubelia is an e-commerce platform.

Public-facing pages should be designed with SEO in mind.

Relevant considerations include:

- Dynamic metadata
- Page titles
- Descriptions
- Canonical URLs
- Open Graph metadata
- Semantic HTML
- Correct heading hierarchy
- Search-engine-readable content
- Structured data where appropriate
- Clean URLs
- Appropriate server-side rendering/static rendering strategies

Product and category pages are particularly important for SEO.

SEO implementation details will be defined when individual pages are specified.

---

# 14. International E-commerce

Meubelia is intended for international customers.

The architecture should avoid unnecessary assumptions that restrict the platform to one country.

The system should remain extensible for:

- Multiple countries
- International addresses
- International customers
- Multiple currencies if required
- International payments
- Country-specific shipping rules if required
- Localization if required

Do not implement complex internationalization functionality until requirements justify it.

Design for extensibility without unnecessary complexity.

---

# 15. Security

Security is a fundamental project requirement.

Always consider:

- Authentication
- Authorization
- Input validation
- SQL injection prevention
- XSS prevention
- CSRF where applicable
- Secure session/cookie handling
- Rate limiting
- File upload security
- Sensitive data exposure
- Mass assignment
- IDOR/access-control vulnerabilities
- Payment security
- Webhook signature verification
- Secret management

Never:

- Hardcode passwords
- Hardcode API secrets
- Commit secrets
- Store payment card data
- Trust frontend prices
- Trust frontend authorization
- Trust frontend payment status
- Expose backend secrets to the browser

---

# 16. Environment Configuration

Environment-specific configuration should use the appropriate environment/configuration mechanisms.

Examples include:

- Database credentials
- Application secrets
- Stripe credentials
- Mail credentials
- Storage configuration
- Backend API URLs
- Application URLs

Never commit secrets to Git.

Never place backend secrets in browser-exposed Next.js environment variables.

Public frontend configuration and private server-side secrets must be clearly separated.

Do not retrieve secrets from the database simply to avoid environment configuration.

If runtime configuration needs to be managed through the application database, distinguish clearly between:

- Public configuration
- Private configuration
- Secrets

Never expose private configuration to unauthenticated clients.

---

# 17. Authentication

The intended authentication technology is Laravel Sanctum.

The exact authentication implementation must be based on the actual frontend/backend deployment architecture and domain configuration.

Possible approaches include:

- Sanctum SPA cookie/session authentication
- Bearer tokens where explicitly required by the architecture

Do not implement authentication assumptions without first inspecting the current project configuration.

Authentication must provide secure handling of:

- Login
- Logout
- Session/authentication state
- CSRF protection where applicable
- Passwords
- Password reset
- Authorization

The exact customer and administrator authentication flows will be defined later.

---

# 18. Stripe Security

Stripe is an external payment service.

Important rules:

- Never expose Stripe secret keys to the browser.
- Never store card numbers.
- Never store CVV.
- Never trust frontend payment status.
- Never trust frontend order totals.
- Never trust frontend product prices.
- Verify Stripe webhook signatures.
- Handle webhook events safely and idempotently.
- Use Stripe's official integration mechanisms.
- Use test credentials/environments during development.

The backend must determine the authoritative order/payment state.

Detailed Stripe implementation will be defined when the checkout/payment requirements are provided.

---

# 19. Testing

Important functionality should have automated tests.

Backend testing should cover relevant areas such as:

- Authentication
- Authorization
- Validation
- Product behavior
- Cart behavior
- Inventory rules
- Order creation
- Order state transitions
- Payment behavior
- Webhooks
- Important API endpoints

Frontend testing should cover critical user flows and components where appropriate.

At minimum, maintain:

- TypeScript correctness
- Backend automated tests
- Frontend tests where appropriate
- Production build validation

Do not delete or weaken tests simply to make a build pass.

---

# 20. Code Quality

Prioritize:

- Readability
- Simplicity
- Maintainability
- Consistency
- Type safety
- Testability
- Security

Avoid over-engineering.

Do not introduce:

- Unnecessary packages
- Unnecessary abstractions
- Unnecessary design patterns
- Unnecessary refactoring

Before adding a dependency, check whether the existing framework or project already provides an appropriate solution.

---

# 21. Development Workflow

Meubelia will be developed incrementally.

**Do not attempt to build the entire application in one task.**

The project will be built page-by-page and feature-by-feature.

For every new task:

1. Read this `CLAUDE.md`.
2. Inspect the current repository.
3. Inspect existing relevant implementation.
4. Understand the current architecture.
5. Identify reusable components, models, routes, services, and utilities.
6. Determine what the requested feature actually requires.
7. Implement only the requested scope.
8. Reuse existing patterns where appropriate.
9. Avoid unrelated refactoring.
10. Run relevant tests/checks.
11. Fix problems introduced by the change.
12. Summarize what was changed.

---

# 22. Page and Feature Specifications

Pages and features will be provided separately.

A future task may provide:

- A page design
- A screenshot/reference
- User flow
- UI requirements
- API requirements
- Validation rules
- Business rules
- Responsive behavior
- SEO requirements
- Loading/error/empty states

When such requirements are provided, treat them as the specification for that task.

Do not invent additional business requirements unless necessary.

If an ambiguity materially affects implementation, ask for clarification.

If the ambiguity is minor and does not affect architecture or business behavior, use the simplest reasonable implementation and document the assumption.

---

# 23. Existing Code Is the Current Reality

Always inspect the repository before making changes.

Do not assume that something is missing because it is not mentioned in a task.

Check whether the following already exist:

- Components
- Pages
- Routes
- Controllers
- Models
- Migrations
- Services
- Policies
- Form Requests
- API Resources
- Utilities
- Types
- Tests
- Dependencies

Reuse existing functionality when appropriate.

Do not duplicate functionality that already exists.

---

# 24. Change Management

Implement focused changes.

Do not make unrelated architectural changes while implementing a page or feature.

If an unrelated issue is discovered:

1. Mention it.
2. Explain why it matters.
3. Do not automatically refactor it unless it blocks the requested task or explicit approval is given.

Prefer small, reviewable changes.

---

# 25. Architectural Decisions

When a significant architectural decision is required:

1. Identify the decision.
2. Explain the available options briefly.
3. Recommend the most appropriate option.
4. Explain the important trade-offs.
5. Implement only after the direction is clear when the decision materially affects the architecture.

Do not make major architectural decisions solely because a particular pattern is common in other e-commerce applications.

Meubelia's actual requirements are the source of truth.

---

# 26. Do Not Assume Features From This Document

The following are project directions, not proof that functionality already exists:

- Authentication
- Customer accounts
- Admin dashboard
- Product variants
- Inventory
- Addresses
- Orders
- Payments
- Notifications
- Reporting
- Multi-currency
- Localization
- Shipping functionality

Always inspect the repository and the current task specification.

---

# 27. Source of Truth

When deciding how something should work, use this priority:

1. **Explicit requirements in the current task**
2. **Existing approved project implementation**
3. **Existing repository conventions**
4. **This `CLAUDE.md`**
5. **Official framework/library conventions**
6. **General industry conventions**

Do not invent business requirements.

If a requirement conflicts with this file, the explicit current requirement takes priority unless it creates a security or technical issue that should be discussed.

---

# 28. Current Project Status

This file describes the intended architecture and technical direction of Meubelia.

It does **not** indicate that all described functionality has been implemented.

The actual implementation status must always be determined by inspecting the repository.

Future development will progressively define:

- Pages
- User flows
- Features
- UI
- API contracts
- Database requirements
- Business rules
- Integrations

Claude Code should always treat the current repository plus explicitly approved requirements as the actual current state of the project.

---

# 29. Final Rule for Claude Code

**Do not build the entire project from this file.**

This file exists to give Claude Code persistent context about:

- What Meubelia is
- What technologies it uses
- How the architecture is organized
- Which application owns which responsibilities
- What engineering principles should be followed
- How future requirements should be handled

Detailed implementation instructions will be provided separately, one page or feature at a time.

---

@AGENTS.md
