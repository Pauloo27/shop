package users

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type UpdateOtherPayload struct {
	IsAdmin bool
}

func UpdateOther(c *fiber.Ctx) error {
	payload := new(UpdateOtherPayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	rawID := c.Params("id", "")

	err := db.Database.Model(&models.User{}).Where("id = ?", rawID).Update("IsAdmin", payload.IsAdmin).Error
	if err != nil {
		panic(err)
	}

	if payload.IsAdmin {
		return utils.AsMsg(c, fiber.StatusOK, "Usuário promovido")
	}
	return utils.AsMsg(c, fiber.StatusOK, "Usuário não é mais admin")
}
