# Contributing to KhmerCoders

Thank you for your interest in contributing! We welcome all kinds of contributions to the KhmerCoders community website, including bug reports, feature requests, code, and documentation.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Database Migrations & Seeding](#database-migrations--seeding)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)
- [Community & Support](#community--support)

---

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster a welcoming and respectful community.

## How to Contribute

1. **Fork the repository** and clone it locally.
2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes** and commit them with clear messages.
4. **Push to your fork** and submit a Pull Request (PR) to the `main` branch.
5. **Describe your changes** in the PR and reference any related issues.

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the setup script** to configure your environment and database:
   ```bash
   npm run setup
   ```
   This will:
   - Create a `.env` file (if missing)
   - Set up the local Cloudflare D1 database
   - Apply database migrations
   - Seed the database with initial data

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Common Database Operations

- **Initialize setup:**
  ```bash
  npm run setup
  ```

- **Making changes to the database:**
  ```bash
  npm run db:generate    # Generate migration files
  npm run db:migrate     # Apply to local database
  npm run db:seed        # Add test data if needed
  ```

- **Reset the database:**
  ```bash
  npm run db:clean       # Clear everything
  npm run db:seed        # Add fresh test data
  ```

- **Working with Chatbot Feature:**
  ```bash
  npm run db:chatbot:schema # Create the schema
  npm run db:chatbot:seed   # Add test data
  ```

## Pull Request Process

- Ensure your branch is up to date with `main` before submitting a PR.
- All PRs are subject to review. Please respond to feedback and make requested changes.
- Ensure your code passes linting and builds successfully.

## Coding Standards

- Follow the existing code style and structure.
- Use clear, descriptive commit messages.
- Run linting and formatting tools if available (e.g., ESLint, Prettier).

## Reporting Issues

- Use [GitHub Issues](https://github.com/KhmerCoders/khmercoders-web/issues) to report bugs or request features.
- Provide as much detail as possible, including steps to reproduce, expected behavior, and screenshots if relevant.

## Community & Support

- Join our [Discord](link-to-discord) or [Telegram](link-to-telegram) for questions and discussions.
- Be respectful and constructive in all communications.

---

Thank you for helping make KhmerCoders better! 