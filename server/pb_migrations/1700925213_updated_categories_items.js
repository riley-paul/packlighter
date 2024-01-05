migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ow2vjgj0",
    "name": "packed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // remove
  collection.schema.removeField("ow2vjgj0")

  return dao.saveCollection(collection)
})
