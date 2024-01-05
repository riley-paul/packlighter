migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  collection.viewRule = "@request.auth.id = user.id"
  collection.createRule = "@request.auth.id = user.id"
  collection.updateRule = "@request.auth.id = user.id"
  collection.deleteRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
