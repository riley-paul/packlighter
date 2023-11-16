migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  collection.name = "categories_items"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  collection.name = "categories_gear"

  return dao.saveCollection(collection)
})
