import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

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
