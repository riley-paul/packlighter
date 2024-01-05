migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kg5ver4t",
    "name": "worn_weight",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xhjadxfl",
    "name": "cons_weight",
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
  collection.schema.removeField("kg5ver4t")

  // remove
  collection.schema.removeField("xhjadxfl")

  return dao.saveCollection(collection)
})
