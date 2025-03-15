import React from "react";
import { Link } from "react-router";
import {UsernamePasswordForm} from "./UsernamePasswordForm";

export function LoginPage() {
    return (
        <div>
            <h2>Login</h2>
            <UsernamePasswordForm />
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}