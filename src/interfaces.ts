import { ReactElement } from "react";
import { PositionSuffix } from "./types";
import { IconType } from "react-icons";

export interface MetaDataCardProps {
  imageFile?: File | null;
  imageUrl?: string;
  imageFilePromise?: Promise<File>;
  metaDataPosition?: PositionSuffix;
  showOnClick?: boolean;
  metaDataCallback?: (metadata: exifMetaData) => void;
  metaDataNotToDisplay?: string[];
}

export interface MetaDataMatch {
  keys: string[];
}

export interface MetaDataListProps {
  metadata: exifMetaData;
  showMetaData: boolean;
  positionSuffix: string;
  onMouseLeave?: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
  children?: ReactElement;
}

export interface InfoIconProps {
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export interface CloseIconProps {
  onClick?: () => void;
}

export interface KeyToLabelMap {
  [key: string]: string;
}

export interface LabelToIconMap {
  [key: string]: IconType;
}

export interface exifMetaData {
  [key: string]: string | number | undefined;
  author?: string;
  description?: string;
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
  ImageDescription?: {
    description: string;
  };
}
