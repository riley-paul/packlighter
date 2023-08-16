migrate((db) => {
  const collection = new Collection({
    "id": "cilk9zaw9biv30f",
    "created": "2023-07-18 23:18:35.494Z",
    "updated": "2023-07-18 23:18:35.494Z",
    "name": "lists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "iecnlxvp",
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
        "id": "9xk39mmw",
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
        "id": "wuxij4ii",
        "name": "month",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 12
        }
      },
      {
        "system": false,
        "id": "rvacmngg",
        "name": "destination",
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
        "id": "ytewxnce",
        "name": "weather",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("cilk9zaw9biv30f");

  return dao.deleteCollection(collection);
})
