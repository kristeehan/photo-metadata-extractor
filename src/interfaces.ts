import { PositionSuffix } from "./types";

export interface MetaDataCardProps {
  imageFile: File;
  metaDataPosition?: PositionSuffix;
  showOnClick?: boolean;
}

export interface MetaDataListProps {
  metadata: exifMetaData;
  showMetaData: boolean;
  positionSuffix: string;
  onMouseLeave?: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
}

export interface InfoIconProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export interface CloseIconProps {
  onClick?: () => void;
}

export interface KeyToLabelMap {
  [key: string]: string;
}

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
