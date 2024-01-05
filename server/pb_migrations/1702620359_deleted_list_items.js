migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "d90l50thpvtpdj1",
    "created": "2023-08-01 04:51:38.175Z",
    "updated": "2023-09-28 00:45:54.036Z",
    "name": "list_items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ybcqcsij",
        "name": "list",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "wf7wx7385ughnw8",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ptxqnrdw",
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
      },
      {
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
      },
      {
        "system": false,
        "id": "saknyouw",
        "name": "packed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "tzj1mdkv",
        "name": "quantity",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      }
    ],
    "listRule": "@request.auth.id = list.user.id",
    "viewRule": "@request.auth.id = list.user.id",
    "createRule": "@request.auth.id = list.user.id",
    "updateRule": "@request.auth.id = list.user.id",
    "deleteRule": "@request.auth.id = list.user.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
