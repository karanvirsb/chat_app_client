import React from "react";
import { Routes, Route } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from "./Pages/Home/home";
import "./App.css";
import SuperTokens, {
    getSuperTokensRoutesForReactRouterDom,
    SuperTokensWrapper,
} from "supertokens-auth-react";
import EmailPassword, {
    EmailPasswordAuth,
} from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "chat app",
        apiDomain: "http://localhost:8000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [
                        {
                            id: "username",
                            label: "Username",
                            placeholder: "Enter an username",
                        },
                        {
                            id: "email",
                            label: "Email",
                            placeholder: "Enter an email",
                        },
                        {
                            id: "password",
                            label: "password",
                            placeholder: "Enter a password",
                        },
                    ],
                },
            },
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <>
            <SuperTokensWrapper>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}

                    <Route
                        path='/'
                        element={
                            <EmailPasswordAuth>
                                <Home></Home>
                            </EmailPasswordAuth>
                        }
                    ></Route>
                </Routes>
            </SuperTokensWrapper>
        </>
    );
}

export default App;
