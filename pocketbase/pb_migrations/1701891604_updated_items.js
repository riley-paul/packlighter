migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // remove
  collection.schema.removeField("ac5rspun")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bh4cfuqm",
    "name": "weight_unit",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ac5rspun",
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

  // remove
  collection.schema.removeField("bh4cfuqm")

  return dao.saveCollection(collection)
})
