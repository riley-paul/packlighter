migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzj1mdkv",
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
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzj1mdkv",
    "name": "quantity",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
