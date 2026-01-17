# GitHub Proxy API

A robust REST API service built with **TypeScript** and **Express** that acts as a middleware to list GitHub repositories and their branch details for a specific user.

It features **dynamic concurrency**, strict **type safety**, **Swagger documentation**, and comprehensive **integration tests**.

## 🚀 Features

*   **Technology Stack:**
    *   Node.js & Express
    *   TypeScript
    *   Jest & Supertest
    *   Swagger/OpenAPI
    *   Test suite: Jest & nock
*   **Architecture:**
    *   Controller -> Service -> Client
    *   Express-Validator for request validation

## 🛠️ Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    Copy and rename `.env.example` to `.env` and fill in the values:

    ```env
    PORT=3000
    GITHUB_TOKEN=your_github_personal_access_token
    ```
    > **Tip:** Generate a token [here](https://github.com/settings/tokens). For public repositories, no specific scopes are required.
    >
    > **Note:** Without a `GITHUB_TOKEN`, the API works but is subject to strict rate limits (60 req/hour) and lower concurrency.

## Start scripts

*   **Development:**
    ```bash
    npm run dev
    ```

*   **Production:**
    ```bash
    npm run build && npm start
    ```

## Testing

Run the integration test suite:

```bash
npm test
```

## API Documentation

Once the server is running (default: port 3000), access the **Swagger UI** interactive documentation at:

👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Main Endpoint

`GET /api/users/:username/repos`

**Parameters:**
*   `Accept` header: `application/json` (Required)
*   `includeForks` query: `true`/`false` (Optional, default: `false`)

**Example Request:**
```bash
curl -H "Accept: application/json" "http://localhost:3000/api/users/google/repos?includeForks=false"
```
