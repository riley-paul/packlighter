migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6pxc17qkd9is3jj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q5jri3dr",
    "name": "sort_order",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6pxc17qkd9is3jj")

  // remove
  collection.schema.removeField("q5jri3dr")

  return dao.saveCollection(collection)
})
