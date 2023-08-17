migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // remove
  collection.schema.removeField("enb3nwb0")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "enb3nwb0",
    "name": "field",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "consumable",
        "worn"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
