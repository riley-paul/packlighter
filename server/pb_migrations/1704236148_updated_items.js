migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bbodm371",
    "name": "weight",
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
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // remove
  collection.schema.removeField("bbodm371")

  return dao.saveCollection(collection)
})
