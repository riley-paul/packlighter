migrate((db) => {
  const collection = new Collection({
    "id": "6y3ibro96lkdttd",
    "created": "2023-02-01 17:52:03.108Z",
    "updated": "2023-02-01 17:52:03.108Z",
    "name": "list_categories",
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
  const collection = dao.findCollectionByNameOrId("6y3ibro96lkdttd");

  return dao.deleteCollection(collection);
})
