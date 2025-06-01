# Swift Auth
![Banner](public/banner.png)

Welcome to Swift Auth, your all-in-one authentication solution. We offer OAuth, credential-based sign-in/sign-up, and Two-Factor Authentication (2FA) for robust security. A seamless interface, powered by Next.js, ensures a smooth user experience. Backed by MySQL for efficient database management and Prisma for optimized data modeling. Plus, we've integrated NextAuth for enhanced authentication features. Simplify your authentication needs with Swift Auth.

## ⚠️ Note
This project is no longer actively maintained and the live deployment previously hosted on AWS Free Tier is no longer available due to AWS policy. However, the full functionality of the project remains intact. You can clone the repository and run it locally for learning or demonstration purposes.

## ⚡ Features

- **OAuth Integration:** Seamlessly authenticate users through popular OAuth providers.
- **Credential Sign-in/Sign-up:** Allow users to create accounts and sign in using email and password credentials.
- **Two-Factor Authentication (2FA):** Enhance security with an additional layer of verification for user accounts.
- **Next.js Powered UI:** Enjoy a smooth and intuitive user interface crafted with Next.js for optimal performance.
- **Efficient Database Management:** MySQL handles database management efficiently.
- **Optimized Data Modeling:** Prisma serves as the ORM for streamlined data operations.
- **NextAuth Integration:** Enhanced authentication capabilities with NextAuth.

## 🔔 Demo

https://github.com/tonishantyadav/swift-auth/assets/91500634/3038ac72-702e-4a42-8aca-298f1ff610dd

## 🛠️ Getting Started

### Clone the repository

```bash
https://github.com/tonishantyadav/swift-auth.git
cd swift-auth
```

### Install project dependencies

```bash
npm install
```

### Setup environment variable

Create a new file named `.env` in the root of your project and add the following content:

```env
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/swift-auth"

AUTH_TRUST_HOST="http://localhost:3000"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

RESEND_API_KEY=
```

- To set value for `NEXTAUTH_SECRET` key, Run this command `bash openssl rand -base64 32` in your terminal and it will give you a random 32-characters long string that you can use as a value for `NEXTAUTH_SECRET` key.

- To configure Google OAuth provider, then refer to https://next-auth.js.org/providers/google

- To configure GitHub OAuth provider, then refer to https://next-auth.js.org/providers/github

- To use Resend as a mail service, then refer to https://resend.com/

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## ❤️ Contributing

If you'd like to contribute to this project, please follow our [Contribution Guidelines](CONTRIBUTING.md)

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
