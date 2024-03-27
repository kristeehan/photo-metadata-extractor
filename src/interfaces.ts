import { ReactElement } from "react";
import { PositionSuffix } from "./types";
import { LucideIcon } from "lucide-react";

export interface MetaDataCardProps<CustomComponentProps> {
  imageFile?: File | null;
  imageUrl?: string;
  metaDataPosition?: PositionSuffix;
  showOnClick?: boolean;
  component?: React.FC<CustomComponentProps> | null;
  componentMetadata?: MetaDataMatch[];
}

export interface MetaDataMatch {
  key: string;
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
  onMouseEnter?: () => void;
}

export interface CloseIconProps {
  onClick?: () => void;
}

export interface KeyToLabelMap {
  [key: string]: string;
}

export interface LabelToIconMap {
  [key: string]: LucideIcon;
}

export interface exifMetaData {
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
