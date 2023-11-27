migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rdnwrjou",
    "name": "show_images",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xxlp1850",
    "name": "show_prices",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4twxcivy",
    "name": "show_weights",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wf7wx7385ughnw8")

  // remove
  collection.schema.removeField("rdnwrjou")

  // remove
  collection.schema.removeField("xxlp1850")

  // remove
  collection.schema.removeField("4twxcivy")

  return dao.saveCollection(collection)
})
