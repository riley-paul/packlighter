migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1vjmzogpv1k9v8b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gdn3ytjd",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1vjmzogpv1k9v8b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gdn3ytjd",
    "name": "quantity",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
