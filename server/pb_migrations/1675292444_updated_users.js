migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tz4jkej4",
    "name": "currentList",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "wf7wx7385ughnw8",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("tz4jkej4")

  return dao.saveCollection(collection)
})
