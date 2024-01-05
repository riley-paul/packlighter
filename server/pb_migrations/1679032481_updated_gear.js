migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gy9e08iw",
    "name": "cons_weight",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2tyst2oc",
    "name": "worn_weight",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // remove
  collection.schema.removeField("gy9e08iw")

  // remove
  collection.schema.removeField("2tyst2oc")

  return dao.saveCollection(collection)
})
