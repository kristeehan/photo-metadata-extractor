import { extractMetaData } from "./photo-extractor";
import React, { useState, useEffect } from "react";
import { Info, XCircle } from "lucide-react";
import MetaDataList from "./MetaDataList";
import {
  CloseIconProps,
  MetaDataCardProps,
  InfoIconProps,
  MetaDataListProps,
  exifMetaData,
} from "./interfaces";
import { handleImageLoaded, isObjectEmpty } from "./helpers";
import styles from "./metadatacard.module.css";

/**
 * Component that displays the metadata of a photo and the photo itself.
 */
function MetaDataCard<CustomComponentProps>({
  imageFile,
  imageUrl,
  metaDataPosition = "top-left",
  showOnClick = false,
  component,
  componentMetadata,
}: MetaDataCardProps<CustomComponentProps>) {
  const [showMetaData, setShowMetaData] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [metadata, setMetadata] = useState({} as exifMetaData);
  const [image, setImage] = useState(null as File | null);
  const [imageSrc, setImagSrc] = useState("");
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
    extractMetaData(image).then(
      (metadata) => {
        setMetadata(metadata);
      },
      (error) => {
        throw error;
      },
    );
  }, [image]);

  useEffect(() => {
    if (imageFile) {
      setImage(imageFile);
    }
    setImagSrc(imageFile ? URL.createObjectURL(imageFile) : imageUrl);
  }, []);

  const renderCustomComponent = () => {
    if (component && metadata && componentMetadata) {
      const componentProps = Object.entries(metadata).reduce(
        (acc, [key, value]) => {
          if (componentMetadata.keys.includes(key)) {
            if (value) {
              acc[key] = value;
            }
          }
          return acc;
        },
        {} as exifMetaData,
      );
      return component(componentProps as CustomComponentProps);
    }
  };

  const iconClassName = styles["icon-overlay"];
  const iconDisplayClassName = styles["icon-overlay--display"];
  const iconPositionClassName = styles[`icon-overlay--${positionSuffix}`];

  return (
    <div data-testid="metadata-card" className={styles["metadata-card"]}>
      <img
        src={imageSrc}
        alt=""
        onLoad={(event) => {
          if (!imageFile) {
            handleImageLoaded(event, setImage);
          }
        }}
      />
      <div
        data-testid="hover-icon"
        className={
          showIcon
            ? `${iconClassName} ${iconDisplayClassName} ${iconPositionClassName}`
            : `${iconClassName} ${iconPositionClassName}}`
        }
      >
        <Info data-testid="info-icon-svg" color="#fff" {...infoIconProps} />
      </div>
      {!isObjectEmpty(metadata) && (
        <MetaDataList {...metaDataListProps}>
          <div
            data-testid="close-icon"
            className={
              showMetaData
                ? styles["close-icon-overlay close-icon-overlay--display"]
                : styles["close-icon-overlay"]
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
      {!isObjectEmpty(metadata) && component && renderCustomComponent()}
    </div>
  );
}

export default MetaDataCard;
