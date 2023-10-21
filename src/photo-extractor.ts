interface photoMetadata {
  name?: string;
  size: number;
  date?: string;
}

export function extractMetaData(image: File): photoMetadata {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = function () {
    console.log(reader.result);
  };

  return {
    name: image.name,
    size: image.size,
    date: image.lastModified.toString(),
  };
}

// function getImageMetaData(fileResult) {
//   console.log(fileResult);
// }
