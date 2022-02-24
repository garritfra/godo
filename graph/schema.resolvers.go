package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/garritfra/godo/graph/generated"
	"github.com/garritfra/godo/graph/model"
	"github.com/satori/go.uuid"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.CreateTodoInput) (*model.Todo, error) {
	u1 := uuid.NewV4()
	todo := &model.Todo{
		ID:   u1.String(),
		Text: input.Text,
		Done: false,
	}
	result := r.DB.Create(&todo)

	return todo, result.Error
}

func (r *mutationResolver) UpdateTodo(ctx context.Context, input model.UpdateTodoInput) (*model.Todo, error) {
	var todo *model.Todo

	result := r.DB.First(&todo).Where("id", input.ID)

	if result.Error != nil {
		return nil, result.Error
	}

	if input.Done != nil {
		todo.Done = *input.Done
	}

	if input.Text != nil {
		todo.Text = *input.Text
	}

	result = r.DB.Save(&todo)

	return todo, result.Error
}

func (r *mutationResolver) DeleteTodo(ctx context.Context, input model.DeleteTodoInput) (*model.Todo, error) {
	var todo *model.Todo

	result := r.DB.First(&todo).Where("id", input.ID).Delete(&model.Todo{})
	return todo, result.Error
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	var todos []*model.Todo
	result := r.DB.Find(&todos)
	fmt.Println(todos)
	return todos, result.Error
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
