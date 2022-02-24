import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
    from,
    HttpLink,
} from "@apollo/client";

const omitTypeNameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
        operation.variables = JSON.parse(
            JSON.stringify(operation.variables),
            omitTypename
        );
    }

    return forward(operation);
});

function omitTypename(key, value) {
    return key === "__typename" ? undefined : value;
}
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
        omitTypeNameLink,
        new HttpLink({ uri: "http://localhost:8080/query" }),
    ]),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
