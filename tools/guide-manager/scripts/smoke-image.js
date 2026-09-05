const path = require('path');
const { config } = require('../server/lib/config');
const settings = require('../server/services/settingsService');
const { generateImage } = require('../server/services/openaiService');
const { optimizeWebp } = require('../server/services/imageService');

async function main() {
  settings.importReferenceCredentials();
  const started = Date.now();
  const generated = await generateImage({
    generationId: null,
    quality: 'medium',
    size: '1536x1024',
    prompt: 'A single elegant unbranded 18K gold ring on a dark charcoal jeweler workbench, restrained warm gold highlights, realistic premium editorial jewelry photography, horizontal 3:2 composition, no people, no logo, no text, no watermark.',
  });
  const target = path.join(config.dataDir, 'images', 'diagnostics', 'gpt-image-2-smoke.webp');
  const result = await optimizeWebp(generated.buffer, target);
  console.log(JSON.stringify({ model: generated.model, quality: 'medium', requestedSize: '1536x1024', ...result, latencyMs: Date.now() - started, usage: generated.usage }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
