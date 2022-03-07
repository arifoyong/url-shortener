package routes

import (
	"os"
	"strconv"
	"time"

	"github.com/arifoyong/url-shortening/database"
	"github.com/arifoyong/url-shortening/helpers"
	"github.com/asaskevich/govalidator"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type request struct {
	URL         string        `json:"url"`
	CustomShort string        `json:"short"`
	Expiry      time.Duration `json:"expiry"`
}

type response struct {
	URL             string        `json:"url"`
	CustomShort     string        `json:"short"`
	Expiry          time.Duration `json:"expiry"`
	XRateRemaining  int           `json:"rate_limit"`
	XRateLimitReset time.Duration `json:"rate_limit_reset"`
}

func ShortenURL(c *fiber.Ctx) error {
	body := new(request)

	if err := c.BodyParser(&body); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse json"})
	}

	// implement rate limiting function here
	db_1 := database.CreateClient(1)
	defer db_1.Close()
	val, err := db_1.Get(database.Ctx, c.IP()).Result()
	if err == redis.Nil {
		rate_limit, err := strconv.Atoi(os.Getenv("RATE_LIMIT_DURATION"))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error in setting rate_limit_duration"})
		}
		_ = db_1.Set(database.Ctx, c.IP(), os.Getenv("API_QUOTA"), time.Duration(rate_limit)*time.Minute).Err()
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Internal server error"})
	} else {
		valInt, _ := strconv.Atoi(val)
		if valInt <= 0 {
			limit, _ := db_1.TTL(database.Ctx, c.IP()).Result()
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
				"error":            "Rate limit exceeded",
				"rate_limit_reset": limit / time.Nanosecond / time.Minute,
			})
		}
	}

	// check if the input sent by user is actual URL
	if !govalidator.IsURL(body.URL) {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid URL"})
	}
	// check for domain error
	if !helpers.RemoveDomainError(body.URL) {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid domain"})
	}

	// enforce https (SSL)
	body.URL = helpers.EnforceHTTP(body.URL)

	// URL Shortening
	var id string
	if body.CustomShort == "" {
		id = uuid.New().String()[:6]
	} else {
		id = body.CustomShort
	}

	db_0 := database.CreateClient(0)
	defer db_0.Close()
	val, _ = db_0.Get(database.Ctx, id).Result()
	if val != "" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "Custom short URL is already in use",
		})
	}

	if body.Expiry == 0 {
		body.Expiry = 24
	}

	err = db_0.Set(database.Ctx, id, body.URL, body.Expiry*time.Hour).Err()
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error in setting key",
		})
	}

	resp := response{
		URL:             body.URL,
		CustomShort:     "",
		Expiry:          body.Expiry,
		XRateRemaining:  10,
		XRateLimitReset: 30,
	}

	db_1.Decr(database.Ctx, c.IP())

	val, _ = db_1.Get(database.Ctx, c.IP()).Result()
	resp.XRateRemaining, _ = strconv.Atoi(val)

	ttl, _ := db_1.TTL(database.Ctx, c.IP()).Result()
	resp.XRateLimitReset = ttl / time.Nanosecond / time.Minute
	resp.CustomShort = os.Getenv("DOMAIN") + "/" + id

	return c.Status(fiber.StatusOK).JSON(resp)
}
