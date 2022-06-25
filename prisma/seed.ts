import { upsertCollection } from "app/models/collection.server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  const address = "0xdB50cd8FE160422F05C2Bd239895752d0493F92c";

  // cleanup the existing database
  await prisma.wallet.delete({ where: { address } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.wallet.create({
    data: {
      address,
    },
  });

  await upsertCollection(
    "Devs for Revolution",
    "Devs for Revolution grants token holders official DD Membership",
    "https://lh3.googleusercontent.com/6Jbode0t_bTO9MHYoYvjIW9nHENCxOs40EGg3Z5ptg4lLlD2z2WXEAIrjyV929aQnIi94hPL4VZ3Pl2NWOO_tSaO6gdjdrcMHrF9=s168",
    "DD",
    "0x25ed58c027921E14D86380eA2646E3a1B5C55A8b",
    "ethereum",
    7900,
    "ERC721"
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
