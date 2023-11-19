import { exifMetaData } from "./interfaces";

export type ExifMetaDataOrNull = exifMetaData | null;

export type PositionSuffix =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type MetaDataLabelIconProps = {
  color: string;
  "data-testid": string;
};
