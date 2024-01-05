migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // remove
  collection.schema.removeField("ygps0vtc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygps0vtc",
    "name": "list_category",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "6y3ibro96lkdttd",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
