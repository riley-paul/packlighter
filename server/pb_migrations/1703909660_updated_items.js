migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmd6kfba",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 2000000,
      "mimeTypes": [
        "image/heif-sequence",
        "image/heif",
        "image/heic-sequence",
        "image/heic",
        "image/tiff",
        "image/webp",
        "image/gif",
        "image/jpeg",
        "image/vnd.mozilla.apng",
        "image/png"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwksz57rr7tc2a2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmd6kfba",
    "name": "field",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 2000000,
      "mimeTypes": [
        "image/heif-sequence",
        "image/heif",
        "image/heic-sequence",
        "image/heic",
        "image/tiff",
        "image/webp",
        "image/gif",
        "image/jpeg",
        "image/vnd.mozilla.apng",
        "image/png"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
