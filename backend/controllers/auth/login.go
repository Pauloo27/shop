package auth

import (
	"errors"
	"time"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Login(c *fiber.Ctx) error {
	payload := new(AuthPayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		return c.JSON(errs)
	}

	var user models.User
	err := db.Database.First(&user,
		"name = ? AND password = ?", payload.Name, utils.HashPassword(payload.Password),
	).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return utils.AsError(c, fiber.StatusNotFound, "Usuário não encontrado")
		}
		panic(err)
	}

	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = user.Name
	claims["admin"] = user.IsAdmin
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(getSecret()))
	if err != nil {
		panic(err)
	}

	return utils.AsJSON(c, fiber.StatusOK, fiber.Map{"jwt": t})
}
