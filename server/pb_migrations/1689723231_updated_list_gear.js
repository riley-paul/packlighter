migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1vjmzogpv1k9v8b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vmpx7tmp",
    "name": "list",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "cilk9zaw9biv30f",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yksv0qvu",
    "name": "gear",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "gdp4p8h68xt03t8",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1vjmzogpv1k9v8b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vmpx7tmp",
    "name": "list",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cilk9zaw9biv30f",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yksv0qvu",
    "name": "gear",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "gdp4p8h68xt03t8",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
