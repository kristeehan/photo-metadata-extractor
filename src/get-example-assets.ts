export default async function getExampleAssets() {
  const response = await fetch("./example_assets/example-photo-8.jpg");
  const blob = await response.blob();
  console.log("here");
  return blob;
}
