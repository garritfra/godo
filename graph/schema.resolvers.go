package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/garritfra/godo/graph/generated"
	"github.com/garritfra/godo/graph/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.CreateTodoInput) (*model.Todo, error) {
	todo := &model.Todo{
		ID:   fmt.Sprintf("T%d", rand.Int()),
		Text: input.Text,
		Done: false,
	}
	r.todos = append(r.todos, todo)

	return todo, nil
}

func (r *mutationResolver) UpdateTodo(ctx context.Context, input model.UpdateTodoInput) (*model.Todo, error) {
	var affectedTodo *model.Todo
	for _, todo := range r.todos {
		if todo.ID == input.ID {
			affectedTodo = todo
		}
	}

	if affectedTodo == nil {
		return nil, nil
	}

	if input.Done != nil {
		affectedTodo.Done = *input.Done
	}

	if input.Text != nil {
		affectedTodo.Text = *input.Text
	}

	return affectedTodo, nil
}

func (r *mutationResolver) DeleteTodo(ctx context.Context, input model.DeleteTodoInput) (*model.Todo, error) {

	for index, todo := range r.todos {
		if todo.ID == input.ID {
			r.todos = RemoveIndex(r.todos, index)
			return todo, nil
		}
	}

	return nil, nil
}

func RemoveIndex(s []*model.Todo, index int) []*model.Todo {
	return append(s[:index], s[index+1:]...)
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	return r.todos, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
