package main

import (
	"log"
	"os"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))
		return nil
	})

	app.OnRecordViewRequest("lists").Add(func(e *core.RecordViewEvent) error {
		// get all categories with the list id
		// join on list_categories with

		categories := e.Record.BaseModel

		app.Dao().DB().Select("*").From("list_categories").Where(dbx.HashExp{"list": e.Record.Id}).All(&categories)
		log.Println("catgegory query", categories)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

	// TODO: add category and item information to list view query
	// TODO: add validation so cateory item may only be either consumable and worn weight, not both
	// TODO: add weight calculations to list query
}
