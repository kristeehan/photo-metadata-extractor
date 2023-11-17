import * as ExifReader from "exifreader";
import { exifMetaData, exifTags } from "./interfaces";

export async function getEXIFMetaData(image: File): Promise<exifMetaData> {
  const tags = await ExifReader.load(image);
  return extractWantedTags(tags);
}

export function getEXIFMetaDataFileBuffer(
  fileBuffer: ArrayBuffer,
): exifMetaData {
  const tags = ExifReader.load(fileBuffer);
  return extractWantedTags(tags);
}

function extractWantedTags(tags: exifTags): exifMetaData {
  const {
    Artist,
    Model,
    Lens,
    "Image Height": height,
    "Image Width": width,
    ISOSpeedRatings,
    ShutterSpeedValue,
    ApertureValue,
    DateTimeOriginal,
  } = tags;
  return {
    author: Artist?.description,
    aperture: ApertureValue?.description,
    focalLength: Lens?.description,
    iso: ISOSpeedRatings?.description,
    shutterSpeed: ShutterSpeedValue?.description,
    date: DateTimeOriginal?.description,
    camera: Model?.description,
    height: height?.value,
    width: width?.value,
  };
}
