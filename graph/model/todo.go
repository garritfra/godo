package model

import "gorm.io/gorm"

type CreateTodoInput struct {
	Text string `json:"text"`
}

type DeleteTodoInput struct {
	ID string `json:"id"`
}

type Todo struct {
	gorm.Model
	ID   string `json:"id" gorm:"column:id"`
	Text string `json:"text" gorm:"column:text"`
	Done bool   `json:"done" gorm:"column:done"`
}

type UpdateTodoInput struct {
	ID   string  `json:"id"`
	Text *string `json:"text"`
	Done *bool   `json:"done"`
}
