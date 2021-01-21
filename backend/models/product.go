package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name   string `gorm:"unique"`
	Price  float32
	Amount int
}
