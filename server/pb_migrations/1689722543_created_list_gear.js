migrate((db) => {
  const collection = new Collection({
    "id": "1vjmzogpv1k9v8b",
    "created": "2023-07-18 23:22:23.362Z",
    "updated": "2023-07-18 23:22:23.362Z",
    "name": "list_gear",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "gdn3ytjd",
        "name": "quantity",
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
        "id": "ttwhna18",
        "name": "category",
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
        "id": "kof8gvda",
        "name": "packed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("1vjmzogpv1k9v8b");

  return dao.deleteCollection(collection);
})
