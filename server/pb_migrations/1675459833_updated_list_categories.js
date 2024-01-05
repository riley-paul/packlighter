migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6pxc17qkd9is3jj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5rkpeaci",
    "name": "list",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("6pxc17qkd9is3jj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5rkpeaci",
    "name": "list",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "wf7wx7385ughnw8",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
