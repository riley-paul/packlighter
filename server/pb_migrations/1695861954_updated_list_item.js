migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  collection.name = "list_items"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  collection.name = "list_item"

  return dao.saveCollection(collection)
})
