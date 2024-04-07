import seedItems from "./items";

export default function seed() {
  Promise.all([seedItems()]).then(() => {
    console.log("Seeding complete");
  });
}

seed();
