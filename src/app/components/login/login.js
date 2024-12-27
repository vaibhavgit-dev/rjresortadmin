"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid credentials. Please try again.");
        } else {
            setError("");
            window.location.href = "/admin"; // Replace with your post-login page
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg flex max-w-4xl w-full">
                {/* Left Side - Dummy Image */}
                <div
                    className="hidden md:block w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('/rjlogin.JPG')` }}
                ></div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Login
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 text-red-600 px-4 py-2 rounded">
                                {error}
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-500">or</p>
                        <button
                            onClick={() => signIn("google")}
                            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none mt-4"
                        >
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
