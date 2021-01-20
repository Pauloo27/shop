package db

import (
	"fmt"

	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var Database *gorm.DB

func Connect() error {
	var err error

	// silent logger
	silent := logger.New(nil, logger.Config{LogLevel: logger.Silent})

	// connect
	Database, err = gorm.Open(sqlite.Open("database.sqlite"), &gorm.Config{
		Logger: silent,
	})

	if err != nil {
		return err
	}

	// migrate models
	Database.AutoMigrate(&models.User{})

	// create default admin user
	var user models.User
	Database.First(&user, 1)

	if user.ID != 1 {
		// random word as password
		defaultPassword := "atmosfera"

		fmt.Println("Default user not found, creating one...")
		user = models.User{
			Name: "admin", IsAdmin: true,
			Password: utils.HashPassword(defaultPassword),
		}

		err = Database.Create(&user).Error
		if err != nil {
			return err
		}

		fmt.Printf("Default user is admin:%s\n", defaultPassword)
	}

	return nil
}
