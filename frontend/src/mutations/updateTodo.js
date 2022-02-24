import { useMutation, gql } from "@apollo/client";

const mutation = gql`
    mutation updateTodo($input: UpdateTodoInput!) {
        updateTodo(input: $input) {
            id
            text
            done
        }
    }
`;

const useUpdateTodo = () => {
    const [mutate] = useMutation(mutation);

    return (input) => mutate({ variables: { input } });
};

export default useUpdateTodo;
