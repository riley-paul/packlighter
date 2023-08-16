migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cilk9zaw9biv30f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2njj8ocn",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cilk9zaw9biv30f")

  // remove
  collection.schema.removeField("2njj8ocn")

  return dao.saveCollection(collection)
})
