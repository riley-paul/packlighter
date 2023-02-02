migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd")

  collection.name = "item_list"

  // remove
  collection.schema.removeField("d1kyyibl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzkfkmhx",
    "name": "item",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "zwksz57rr7tc2a2",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd")

  collection.name = "list_categories"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d1kyyibl",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("uzkfkmhx")

  return dao.saveCollection(collection)
})
