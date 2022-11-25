import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SocketHandler from "./Sockets/SocketHandler";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <Provider store={store}>
                    <SocketHandler>
                        <App />
                    </SocketHandler>
                </Provider>
            </Router>
        </QueryClientProvider>
    </React.StrictMode>
);
