import { PrismaClient } from "@prisma/client";
import products from "./productsData.js";

// note you will get a error "type not module"
// to solve that change type: module in package.json while running the script and then change it back while running the yarn dev
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < products.length; i++) {
    const product = await prisma.product.create({
      data: {
        title: products[i].title,
      },
    });
    console.log(product);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
