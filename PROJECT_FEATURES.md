# Project Overview: ZERUS COFFEE E-commerce Application

This document outlines the key features and functionalities of the ZERUS COFFEE e-commerce application, based on an analysis of its codebase.

## 1. Core Application Structure

The application is built using Next.js, evident from the `app` directory structure which follows the App Router convention.

### 1.1. Authentication Module (`app/(auth)`)

Handles user authentication flows, allowing users to securely access the application.
- **User Login:** Users can log in using their credentials via the `LoginForm`.
- **User Registration:** New users can create an / via the registration page.
- **Google Authentication:** Supports login using Google accounts.
- **Password Recovery:** Users can initiate a "forgot password" flow to receive a password reset email.
- **Password Reset:** Allows users to set a new password after a successful password recovery request.
- **User Logout:** Provides functionality for users to securely log out of their session.

### 1.2. Storefront Module (`app/(store)`)

Manages the customer-facing e-commerce functionalities, providing a rich shopping experience.
- **Homepage Display:** Shows marketing elements like banner carousels, promotional marquees, "about" sections, featured products, and newest products.
- **Product Listing & Filtering:** Displays products by categories, allows browsing through product lists, and supports filtering/sorting.
- **Product Details:** Provides detailed information for individual products, including available options and related products.
- **Shopping Cart Management:** Users can add items to their cart, update item quantities, remove items, and clear their cart.
- **Checkout Process:** Guides users through the steps to finalize their purchase.
- **Payment Processing:** Integrates with payment gateways (e.g., MoMo) to handle online payments.
- **Blog Section:** Features a dedicated section for displaying blog posts, which can be categorized.

### 1.3. User Account Module (`app/account`)

Provides functionalities for registered users to manage their profiles and orders.
- **Account Dashboard:** A central hub for users to view their account information.
- **Profile Management:** Users can update their personal information and profile picture.
- **Address Management:** Allows users to add, edit, delete, and set a default shipping/billing address. Includes fetching provinces and wards for address selection.
- **Coupon & Promotion Management:** Displays available coupons and allows users to manage them.
- **Notifications:** Provides a section for user notifications.
- **Order History & Details:** Users can view their past orders and detailed information for each order.
- **Payment Methods Management:** Section to manage saved payment methods.
- **Security Settings:** Includes options to change password, view account activity, and manage logged-in devices.

## 2. Shared Components (`components`)

A rich library of reusable UI components categorized by function, ensuring consistency and ease of development.

### 2.1. UI Primitives (`components/ui`)

Contains fundamental UI elements, likely built with a UI library (e.g., Shadcn UI) for a consistent design system.
- Examples include: `avatar`, `badge`, `button`, `card`, `carousel`, `dialog`, `dropdown-menu`, `field`, `form`, `input`, `label`, `popover`, `radio-group`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `tooltip`.

### 2.2. Feature-Specific Components

- **Buttons:** Specialized buttons for actions like adding to cart, Google login, and PayPal payments.
- **Cart:** Components for displaying cart items, summarizing the cart, and showing an empty cart state.
- **Checkout:** UI components for each step of the checkout process (address, order summary, payment, review), including a checkout stepper.
- **Dialogs:** Reusable dialogs for actions like adding or editing addresses.
- **Forms:** Dedicated forms for various user interactions (e.g., change password, forgot password, login, register, reset password, update profile).
- **Layout:** Standard layout components like `footer`, `header`, and a `layout-wrapper`.
- **Product:** Components for displaying product cards, carousels, and loading skeletons.
- **Providers:** Context providers such as `order-status-provider` and `swr-provider` for data management.
- **Schema:** Schema definitions for business and product entities.

## 3. Services and Data Management (`services`, `hooks`, `types`)

### 3.1. API Services (`services`)

Modules responsible for interacting with the backend API, abstracting data fetching and manipulation.
- **Address Service:** Manages CRUD operations for user addresses, and fetches location data (provinces, wards).
- **Authentication Service:** Handles user login, registration, Google login, password recovery, password reset, and logout.
- **Cart Service:** Manages adding, updating, removing, and clearing items in the shopping cart.
- **Category Service:** Retrieves a list of all product categories.
- **Checkout Service:** Processes the final checkout, creating orders, and supports order cancellation.
- **Coupon Service:** Fetches and manages available coupons.
- **Order Service:** Retrieves details for specific user orders.
- **Product Service:** Manages fetching featured, newest, and all products, product details by slug, product options, maximum product price, and related products.
- **User Service:** Manages user profile updates (information, avatar) and password changes.

### 3.2. Custom Hooks (`hooks`)

Custom React hooks for encapsulating reusable logic and state management across components.
- Examples include: `use-cart`, `use-category`, `use-debounce`, `use-mobile`, `use-option`, `use-order-status`, `use-order`, `use-product`, `useDebouncedCartUpdate`.

### 3.3. Type Definitions (`types`)

TypeScript type definitions for various entities and API responses, ensuring type safety throughout the application.
- Includes types for addresses, blogs, categories, coupons, options, orders, products, and users, as well as common types for errors, pagination, and API responses.

## 4. Utilities and Configurations

- **Axios Configuration:** Centralized configuration for HTTP requests (`config/axios.ts`).
- **Constants:** Application-wide constants (`constants/const.ts`).
- **Checkout Guard:** Logic for protecting routes or actions during the checkout process.
- **Libraries:** Utility functions for cookie management (`lib/cookie.ts`), GSAP animations (`lib/gsap.ts`), and general utilities (`lib/utils.ts`).
- **Validation:** Schema definitions (using Zod) for input validation across various forms and data structures (e.g., address, authentication, cart, checkout, user schemas).
- **Next.js Configurations:** Configuration files specific to Next.js (`next.config.ts`, `proxy.ts`, `robot.ts`, `sitemap.ts`).
- **Global Styling:** Global CSS definitions (`app/globals.css`).
- **Utility Functions:** Functions for avatar handling (`utils/avatar.ts`) and data fetching (`utils/fetcher.ts`).

## 5. Build and Development Tools

- Standard configuration files for version control (`.gitignore`), linting (`eslint.config.mjs`), styling (`postcss.config.mjs`), package management (`package.json`, `package-lock.json`), and TypeScript (`tsconfig.json`).
- Build output directory (`.next`).
- `components.json`: Likely used for configuring UI component libraries, such as Shadcn UI.

## Conclusion

The ZERUS COFFEE application is a robust e-commerce platform offering a comprehensive set of features designed to facilitate online coffee sales. It provides full user authentication and account management, a dynamic storefront for product discovery and purchasing, and an efficient checkout process. The architecture is modular, leveraging modern web development practices with Next.js, React, and TypeScript, backed by dedicated services for API interaction, custom hooks for reusable logic, and strong type definitions for code reliability.
