import { extractMetaData } from "./photo-extractor";
import { useState, useEffect } from "react";
import { Info, XCircle } from "lucide-react";
import MetaDataList from "./MetaDataList";
import {
  CloseIconProps,
  MetaDataCardProps,
  InfoIconProps,
  MetaDataListProps,
  exifMetaData,
} from "./interfaces";

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
  const [metadata, setMetadata] = useState({} as exifMetaData);
  const positionSuffix = metaDataPosition;
  const infoIconProps: InfoIconProps = {};
  const closeIconProps: CloseIconProps = {};
  const metaDataListProps: MetaDataListProps = {
    metadata,
    showMetaData,
    positionSuffix,
  };

  closeIconProps.onClick = () => {
    setShowMetaData(false);
    setShowIcon(true);
  };

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
    metaDataListProps.onMouseLeave = (e) => {
      e.stopPropagation();
      setShowMetaData(false);
      setShowIcon(true);
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
        <Info data-testid="info-icon-svg" color="#fff" {...infoIconProps} />
      </div>
      {metadata && (
        <MetaDataList {...metaDataListProps}>
          <div
            data-testid="close-icon"
            className={
              showMetaData
                ? "close-icon-overlay close-icon-overlay--display"
                : "close-icon-overlay"
            }
          >
            {showOnClick && showMetaData && (
              <XCircle
                color="#fff"
                data-testid="close-icon-svg"
                {...closeIconProps}
              />
            )}
          </div>
        </MetaDataList>
      )}
    </div>
  );
}

export default MetaDataCard;
