export default async function getExampleAssets() {
  const promises = [];
  for (let i = 1; i <= 8; i++) {
    promises.push(fetch(`./example_assets/example-photo-${i}.jpg`));
  }

  const responses = await Promise.all(promises);
  const blobs = await Promise.all(responses.map((response) => response.blob()));
  return blobs;
}
