import { getFileMetaData } from "./meta-data-helpers";

interface photoMetadata {
  name?: string;
  size: number;
  date?: string;
}

interface imageDimensions {
  width: number;
  height: number;
}

export function extractMetaData(image: File): photoMetadata {
  const reader = new FileReader();
  reader.readAsArrayBuffer(image);
  reader.onload = function () {
    getFileMetaData(reader.result as ArrayBufferLike);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

/**
 * Get the image size from the passed file reader result
 * Create a temporary image element, return the width/height as a json object
 * @param fileResult
 */
function getImageSize(image: string): Promise<imageDimensions> {
  const $image = document.createElement("img");
  const dimensionsPromise = new Promise<imageDimensions>((resolve) => {
    $image.onload = function () {
      resolve({
        width: $image.width,
        height: $image.height,
      });
    };
  });
  $image.src = image;
  $image.onload = function () {
    console.log($image.width);
    console.log($image.height);
  };
  return dimensionsPromise;
}
