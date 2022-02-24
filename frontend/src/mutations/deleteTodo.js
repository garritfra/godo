import { useMutation, gql } from "@apollo/client";

const mutation = gql`
    mutation deleteTodo($input: DeleteTodoInput!) {
        deleteTodo(input: $input) {
            id
            text
            done
        }
    }
`;

const useDeleteTodo = () => {
    const [mutate] = useMutation(mutation);

    return (id) => mutate({ variables: { input: { id } } });
};

export default useDeleteTodo;
