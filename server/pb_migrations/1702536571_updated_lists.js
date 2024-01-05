migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0qnmiulx",
    "name": "sort_order",
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
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // remove
  collection.schema.removeField("0qnmiulx")

  return dao.saveCollection(collection)
})
