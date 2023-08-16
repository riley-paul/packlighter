migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cilk9zaw9biv30f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j66jppom",
    "name": "gear",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cilk9zaw9biv30f")

  // remove
  collection.schema.removeField("j66jppom")

  return dao.saveCollection(collection)
})
