migrate((db) => {
  const collection = new Collection({
    "id": "6pxc17qkd9is3jj",
    "created": "2023-02-03 17:00:26.850Z",
    "updated": "2023-02-03 17:00:26.850Z",
    "name": "list_categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "p76lmj8p",
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
  const collection = dao.findCollectionByNameOrId("6pxc17qkd9is3jj");

  return dao.deleteCollection(collection);
})
