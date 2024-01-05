migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd")

  collection.listRule = "@request.auth.id = item.user.id"
  collection.viewRule = "@request.auth.id = item.user.id"
  collection.createRule = "@request.auth.id = item.user.id"
  collection.updateRule = "@request.auth.id = item.user.id"
  collection.deleteRule = "@request.auth.id = item.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
