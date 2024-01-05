migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "txgyz4mx",
    "name": "quantity",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // remove
  collection.schema.removeField("txgyz4mx")

  return dao.saveCollection(collection)
})
