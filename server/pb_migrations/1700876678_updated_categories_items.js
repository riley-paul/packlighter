migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nvahpy6r",
    "name": "category",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "6pxc17qkd9is3jj",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nvahpy6r",
    "name": "category",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "6pxc17qkd9is3jj",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
