import { getEXIFMetaData, exifMetaData } from "./meta-data-helpers";

export async function extractMetaData(image: File): Promise<exifMetaData> {
  const metadata = await getEXIFMetaData(image);
  return metadata;
}
