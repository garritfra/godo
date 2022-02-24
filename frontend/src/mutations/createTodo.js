import { useMutation, gql } from "@apollo/client";

const mutation = gql`
    mutation createTodo($input: CreateTodoInput!) {
        createTodo(input: $input) {
            id
            text
            done
        }
    }
`;

const useCreateTodo = () => {
    const [mutate] = useMutation(mutation);

    return (input) => mutate({ variables: { input } });
};

export default useCreateTodo;
