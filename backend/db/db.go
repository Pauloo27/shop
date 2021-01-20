package db

import (
	"github.com/Pauloo27/shop/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Database *gorm.DB

func Connect() error {
	var err error

	// connect
	Database, err = gorm.Open(sqlite.Open("database.sqlite"), &gorm.Config{})
	if err != nil {
		return err
	}

	// migrate models
	Database.AutoMigrate(&models.User{})

	return nil
}
