import {
  getEXIFMetaData,
  getEXIFMetaDataFileBuffer,
} from "./meta-data-helpers";
import { exifMetaData } from "./interfaces";

export async function extractMetaData(
  image: File | null,
): Promise<exifMetaData> {
  if (!image) return {} as exifMetaData;
  const metadata = await getEXIFMetaData(image);
  return metadata;
}

export function extractMetaDataFile(imageBuffer: ArrayBuffer): exifMetaData {
  return getEXIFMetaDataFileBuffer(imageBuffer);
}
