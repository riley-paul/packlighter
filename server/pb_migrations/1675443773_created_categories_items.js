migrate((db) => {
  const collection = new Collection({
    "id": "sydktarhcp2ongv",
    "created": "2023-02-03 17:02:53.754Z",
    "updated": "2023-02-03 17:02:53.754Z",
    "name": "categories_items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dxq8mcol",
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
        "id": "nvahpy6r",
        "name": "category",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "6pxc17qkd9is3jj",
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
  const collection = dao.findCollectionByNameOrId("sydktarhcp2ongv");

  return dao.deleteCollection(collection);
})
