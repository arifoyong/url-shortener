package routes

import (
	"github.com/arifoyong/url-shortening/database"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

func ResolveURL(c *fiber.Ctx) error {
	url := c.Params("url")

	dbClient := database.CreateClient(0)
	defer dbClient.Close()

	val, err := dbClient.Get(database.Ctx, url).Result()
	if err == redis.Nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "short url not found"})
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "cannot connect to db"})
	}

	rInr := database.CreateClient(1)
	defer rInr.Close()

	_ = rInr.Incr(database.Ctx, "counter")

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"url": val})
}
