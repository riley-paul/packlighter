migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gnisbzyl",
    "name": "category",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd")

  // remove
  collection.schema.removeField("gnisbzyl")

  return dao.saveCollection(collection)
})
