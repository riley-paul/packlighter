migrate((db) => {
  const collection = new Collection({
    "id": "gdp4p8h68xt03t8",
    "created": "2023-07-18 23:20:54.579Z",
    "updated": "2023-07-18 23:20:54.579Z",
    "name": "gear",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ywmldt7e",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "lmiybelt",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mvxxlpst",
        "name": "weight",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "sfatyntn",
        "name": "price",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "t3vov1z6",
        "name": "price_currency",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "CAD",
            "USD",
            "EUR"
          ]
        }
      },
      {
        "system": false,
        "id": "gpxlxd88",
        "name": "image_url",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gdp4p8h68xt03t8");

  return dao.deleteCollection(collection);
})
