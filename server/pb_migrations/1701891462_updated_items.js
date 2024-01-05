migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ac5rspun",
    "name": "weight_unit",
    "type": "select",
    "required": true,
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
})
