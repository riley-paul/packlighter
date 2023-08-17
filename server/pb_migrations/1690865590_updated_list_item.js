migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rt3okh0h",
    "name": "category",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "saknyouw",
    "name": "packed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzj1mdkv",
    "name": "quantity",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1")

  // remove
  collection.schema.removeField("rt3okh0h")

  // remove
  collection.schema.removeField("saknyouw")

  // remove
  collection.schema.removeField("tzj1mdkv")

  return dao.saveCollection(collection)
})
