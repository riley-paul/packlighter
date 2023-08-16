migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gdp4p8h68xt03t8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktvgxymi",
    "name": "user",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("gdp4p8h68xt03t8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktvgxymi",
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
})
