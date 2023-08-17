migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gdp4p8h68xt03t8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhvszkxa",
    "name": "weight_unit",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "GRAMS",
        "POUNDS",
        "OUNCES",
        "KILOGRAMS"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gdp4p8h68xt03t8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhvszkxa",
    "name": "weight_unit",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "GRAMS",
        "POUNDS",
        "OUNCES",
        "KILOGRAMS"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
