migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  collection.listRule = "@request.auth.id = list.user.id"
  collection.viewRule = "@request.auth.id = list.user.id"
  collection.createRule = "@request.auth.id = list.user.id"
  collection.updateRule = "@request.auth.id = list.user.id"
  collection.deleteRule = "@request.auth.id = list.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
