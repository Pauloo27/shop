package users

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type UpdateOtherPayload struct {
	IsAdmin string `validate:"required,eq=true|eq=false"`
}

func UpdateOther(c *fiber.Ctx) error {
	payload := new(UpdateOtherPayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		return c.JSON(errs)
	}

	id := c.Params("id", "")

	var user models.User
	err := db.Database.First(&user, id).Error
	if err != nil {
		panic(err)
	}

	err = db.Database.Model(&user).Update("IsAdmin", payload.IsAdmin == "true").Error
	if err != nil {
		panic(err)
	}
	if user.IsAdmin {
		return utils.AsMsg(c, fiber.StatusAccepted, "Usuário promovido")
	}
	return utils.AsMsg(c, fiber.StatusAccepted, "Usuário não é mais admin")
}
