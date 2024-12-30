import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        CredentialProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = {
                    id: "1",
                    name: "Rj Resort Admin",
                    email: "rjresort@gmail.com",
                    password: "12345678",
                };

                const { email, password } = credentials;

                if (email === user.email && password === user.password) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                return profile.email === "vaibhav@hibiscus.services";
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + "/admin";
        },
    },
    session: {
        strategy: "jwt",
    },
};
