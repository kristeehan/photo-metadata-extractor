import {
  getEXIFMetaData,
  getEXIFMetaDataFileBuffer,
  exifMetaData,
} from "./meta-data-helpers";

export async function extractMetaData(image: File): Promise<exifMetaData> {
  const metadata = await getEXIFMetaData(image);
  return metadata;
}

export function extractMetaDataFile(imageBuffer: ArrayBuffer): exifMetaData {
  return getEXIFMetaDataFileBuffer(imageBuffer);
}
