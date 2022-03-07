package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/arifoyong/url-shortening/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func setupRoutes(app *fiber.App) {
	app.Get("/test", func(c *fiber.Ctx) error {
		fmt.Println("minute", 60/time.Minute)
		fmt.Println("nanosecond", 60/time.Nanosecond)
		fmt.Println("nanosecond", 60/time.Nanosecond/time.Minute)
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"msg": "ok"})
	})
	app.Get("/:url", routes.ResolveURL)
	app.Post("/api/v1", routes.ShortenURL)
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	app := fiber.New()
	app.Use(logger.New())

	setupRoutes(app)
	log.Fatal(app.Listen(os.Getenv("APP_PORT")))
}
