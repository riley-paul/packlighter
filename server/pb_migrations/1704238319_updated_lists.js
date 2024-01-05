migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2der9hun",
    "name": "weight_unit",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "g",
        "kg",
        "oz",
        "lb"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // remove
  collection.schema.removeField("2der9hun")

  return dao.saveCollection(collection)
})
