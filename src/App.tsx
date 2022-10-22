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
import ModalDisplay from "./Components/Modal/ModalDisplay";

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

import { useAppSelector } from "./Hooks/reduxHooks";

export default function App() {
    const modalOpen = useAppSelector((state) => state.modalReducer.open);
    const modalOptions = useAppSelector((state) => state.modalReducer.options);
    const modalName = useAppSelector((state) => state.modalReducer.modalName);

    return (
        <>
            <ModalDisplay
                open={modalOpen}
                options={modalOptions}
                modalName={modalName}
            ></ModalDisplay>
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
