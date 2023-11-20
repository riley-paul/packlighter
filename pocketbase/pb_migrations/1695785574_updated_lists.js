migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jrrza8qn",
    "name": "data",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // remove
  collection.schema.removeField("jrrza8qn")

  return dao.saveCollection(collection)
})
