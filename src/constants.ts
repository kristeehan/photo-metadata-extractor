interface KeyToLabelMap {
  [key: string]: string;
}

export const keyToLabelMap: KeyToLabelMap = {
  author: "Creator",
  shutterSpeed: "Shutter Speed",
  focalLength: "Focal Length",
  aperture: "Aperture",
  iso: "ISO",
  date: "Date",
  camera: "Camera",
  height: "Height",
  width: "Width",
};

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
export interface exifTags {
  Artist?: {
    description: string;
  };
  Model?: {
    description: string;
  };
  Lens?: {
    description: string;
  };
  "Image Height"?: {
    value: number;
  };
  "Image Width"?: {
    value: number;
  };
  ISOSpeedRatings?: {
    description: string;
  };
  ShutterSpeedValue?: {
    description: string;
  };
  ApertureValue?: {
    description: string;
  };
  DateTimeOriginal?: {
    description: string;
  };
}
