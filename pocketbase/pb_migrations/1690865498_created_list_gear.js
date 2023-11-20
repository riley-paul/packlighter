migrate((db) => {
  const collection = new Collection({
    "id": "d90l50thpvtpdj1",
    "created": "2023-08-01 04:51:38.175Z",
    "updated": "2023-08-01 04:51:38.175Z",
    "name": "list_gear",
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
      }
    ],
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
  const collection = dao.findCollectionByNameOrId("d90l50thpvtpdj1");

  return dao.deleteCollection(collection);
})
