migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6y3ibro96lkdttd",
    "created": "2023-02-01 17:52:03.108Z",
    "updated": "2023-02-03 15:40:03.055Z",
    "name": "item_list",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "p8opmv76",
        "name": "list",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "wf7wx7385ughnw8",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
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
      },
      {
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
      }
    ],
    "listRule": "@request.auth.id = item.user.id",
    "viewRule": "@request.auth.id = item.user.id",
    "createRule": "@request.auth.id = item.user.id",
    "updateRule": "@request.auth.id = item.user.id",
    "deleteRule": "@request.auth.id = item.user.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
