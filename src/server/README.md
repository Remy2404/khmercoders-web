# Server

This folder contains all the backend functionality for the KhmerCoders web application. It's organized into three main directories, each serving a specific purpose in our server-side architecture.

## 📁 Folder Structure

```text
server/
├── actions/      # Server Actions
├── cache/        # React Cache utilities
├── services/     # Business logic services
└── README.md     # This file
```

## 🚀 Actions

The `actions/` folder contains **Server Actions** - functions that run on the server and can be called directly from client components. These provide a seamless way to handle form submissions and server-side operations.

**Files:**

- `article.ts` - Article-related server actions
- `experiences.ts` - Experience management actions
- `file.ts` - File handling operations
- `insight.ts` - Insights and analytics actions
- `middleware.ts` - Action middleware and utilities
- `track.ts` - Tracking and monitoring actions
- `users.ts` - User management actions

Server Actions allow us to:

- Handle form submissions without API routes
- Perform server-side validation
- Execute database operations securely
- Maintain type safety between client and server

## 🗄️ Cache

The `cache/` folder implements **React Cache** functionality for optimizing data fetching and reducing redundant requests.

**Files:**

- `user.ts` - User data caching utilities

React Cache helps us:

- Deduplicate identical requests
- Cache function results across component renders
- Improve application performance
- Reduce database load

## 🔧 Services

The `services/` folder contains business logic services that handle complex operations and integrations.

**Files:**

- `upload.tsx` - File upload service and utilities

Services provide:

- Reusable business logic
- Third-party API integrations
- Complex data processing
- Shared utilities across actions and components

## 🏗️ Architecture Overview

```text
Client Components
       ↓
Server Actions (actions/)
       ↓
Services (services/) ← Cache (cache/)
       ↓
Database/External APIs
```

This architecture ensures:

- **Separation of Concerns**: Each layer has a specific responsibility
- **Reusability**: Services can be used across multiple actions
- **Performance**: Caching reduces redundant operations
- **Type Safety**: Full TypeScript support throughout the stack
- **Security**: Server-side validation and data handling

## 🔄 Data Flow

1. **Client** triggers a server action
2. **Action** validates input and orchestrates the operation
3. **Service** handles business logic and external integrations
4. **Cache** optimizes data fetching and storage
5. **Response** flows back through the same layers

## 📝 Best Practices

- Keep actions focused on orchestration
- Implement business logic in services
- Use cache for expensive operations
- Maintain proper error handling
- Follow TypeScript conventions
- Document complex operations

---

*This server architecture supports the KhmerCoders platform by providing a robust, scalable, and maintainable backend foundation.*