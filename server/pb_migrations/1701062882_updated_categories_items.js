migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2knkaxnm",
    "name": "sort_order",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // remove
  collection.schema.removeField("2knkaxnm")

  return dao.saveCollection(collection)
})
