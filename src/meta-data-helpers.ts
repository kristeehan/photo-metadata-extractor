import * as ExifReader from "exifreader";
export interface exifMetaData {
  author?: string;
  focalLength?: string;
  iso?: string;
  shutterSpeed?: string;
  aperture?: string;
  date?: string;
  camera?: string;
  height?: number;
  width?: number;
}

export async function getEXIFMetaData(image: File): Promise<exifMetaData> {
  const tags = await ExifReader.load(image);
  // console.log(tags);
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
