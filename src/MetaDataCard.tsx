import { extractMetaData } from "./photo-extractor";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { keyToLabelMap, exifMetaData } from "./constants";
import MetaDataList from "./MetaDataList";

type ExifMetaDataOrNull = exifMetaData | null;
type PositionSuffix = "top-left" | "top-right" | "bottom-left" | "bottom-right";
interface MetaDataCardProps {
  imageFile: File;
  metaDataPosition?: PositionSuffix;
  showOnClick?: boolean;
}

interface InfoIconProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
}

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
  const [metadata, setMetadata] = useState(null as ExifMetaDataOrNull);
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
        setMetadata(metadata as ExifMetaDataOrNull);
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
        <MetaDataList
          metadata={metadata}
          showMetaData={showMetaData}
          positionSuffix={positionSuffix}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setShowMetaData(false);
            setShowIcon(true);
          }}
        />
      )}
    </div>
  );
}

export default MetaDataCard;
