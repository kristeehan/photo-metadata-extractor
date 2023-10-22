import * as ExifReader from "exifreader";
export interface exifMetaData {
  author?: string;
  focalLength?: string;
  iso?: string;
  shutterSpeed?: string;
  aperture?: string;
  date?: string;
}

export async function getEXIFMetaData(image: File): Promise<exifMetaData> {
  const tags = await ExifReader.load(image);
  console.log(tags);
  const {
    Model,
    Lens,
    ISO,
    ShutterSpeedValue,
    ApertureValue,
    DateTimeOriginal,
  } = tags;
  return {
    aperture: ApertureValue?.description,
  };
}
