const settings = require('../server/services/settingsService');
const inventory = require('../server/services/inventoryService');
const { runBenchmark } = require('../server/services/evaluationService');

async function main() {
  settings.importReferenceCredentials();
  inventory.scanInventory();
  const result = await runBenchmark();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
