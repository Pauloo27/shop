package models

import "gorm.io/gorm"

type Sale struct {
	gorm.Model
	UserID    int
	User      User
	ProductID int
	Product   Product
}
