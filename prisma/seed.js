const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  const address = "0xdB50cd8FE160422F05C2Bd239895752d0493F92c";

  // cleanup the existing database
  await prisma.wallet.delete({ where: { address } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const wallet = await prisma.wallet.create({
    data: {
      wallet,
    },
  });

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
