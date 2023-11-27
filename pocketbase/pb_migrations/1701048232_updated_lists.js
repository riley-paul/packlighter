migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "odjzu7vz",
    "name": "show_packed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // remove
  collection.schema.removeField("odjzu7vz")

  return dao.saveCollection(collection)
})
