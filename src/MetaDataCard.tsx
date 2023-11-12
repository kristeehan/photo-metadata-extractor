import { extractMetaData } from "./photo-extractor";
import { exifMetaData } from "./meta-data-helpers";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";

interface MetaDataCardProps {
  imageFile: File;
  metaDataPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showOnClick?: boolean;
}

interface InfoIconProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
}

interface KeyToLabelMap {
  [key: string]: string;
}

const keyToLabelMap: KeyToLabelMap = {
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

/**
 * Component that displays the metadata of a photo and the photo itself.
 */
function MetaDataCard({
  imageFile,
  metaDataPosition = "top-left",
  showOnClick = false,
}: MetaDataCardProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  const [showMetaData, setShowMetaData] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [metadata, setMetadata] = useState(null as exifMetaData | null);
  const positionSuffix = metaDataPosition;

  const infoIconProps: InfoIconProps = {};

  if (showOnClick) {
    infoIconProps.onClick = () => {
      setShowMetaData(!showMetaData);
      setShowIcon(!showIcon);
    };
  } else {
    infoIconProps.onMouseEnter = () => {
      setShowMetaData(true);
      setShowIcon(false);
    };
  }

  useEffect(() => {
    extractMetaData(imageFile).then(
      (metadata) => {
        setMetadata(metadata);
      },
      (error) => {
        throw error;
      },
    );
  }, [imageHasLoaded, imageFile]);

  return (
    <div data-testid="metadata-card" className="metadata-card">
      <img
        src={URL.createObjectURL(imageFile)}
        alt=""
        onLoad={() => setImageHasLoaded(true)}
      />
      <div
        data-testid="hover-icon"
        className={
          showIcon
            ? `icon-overlay--display icon-overlay icon-overlay--${positionSuffix}`
            : `icon-overlay icon-overlay--${positionSuffix}`
        }
      >
        <Info data-testid="hover-icon-svg" color="#fff" {...infoIconProps} />
      </div>
      {metadata && (
        <ul
          data-testid="metadata-list"
          className={
            showMetaData
              ? `metadata-list metadata-list--display metadata-list--${positionSuffix}`
              : `metadata-list metadata-list--${positionSuffix}`
          }
          onMouseLeave={(e) => {
            e.stopPropagation();
            setShowMetaData(false);
            setShowIcon(true);
          }}
        >
          {Object.entries(metadata).map(([key, value]) => (
            <li key={key}>
              <strong>{keyToLabelMap[key] ? keyToLabelMap[key] : key}</strong>:{" "}
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MetaDataCard;
