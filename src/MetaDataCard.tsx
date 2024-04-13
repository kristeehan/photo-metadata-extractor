import { extractMetaData } from "./photo-extractor";
import React, { useState, useEffect, useCallback } from "react";
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
  imageFile = null,
  imageFilePromise,
  imageUrl = "",
  metaDataPosition = "top-left",
  showOnClick = false,
  metaDataCallback,
  component,
  componentMetadata,
}: MetaDataCardProps<CustomComponentProps>) {
  // State
  const [showMetaData, setShowMetaData] = useState(false);
  const [metadata, setMetadata] = useState({} as exifMetaData);
  const [imageToExtractFrom, setImageToExtractFrom] = useState(
    null as File | null,
  );
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [file, setFile] = useState<File | null>(imageFile);

  // Props
  const positionSuffix = metaDataPosition;
  const infoIconProps: InfoIconProps = {};
  const closeIconProps: CloseIconProps = {};
  const metaDataListProps: MetaDataListProps = {
    metadata,
    showMetaData,
    positionSuffix,
  };

  // Memoized metadata toggler
  const toggleMetaData = useCallback(() => {
    setShowMetaData(!showMetaData);
  }, [showMetaData]);

  closeIconProps.onClick = () => {
    toggleMetaData();
  };

  if (showOnClick) {
    infoIconProps.onClick = () => {
      toggleMetaData();
    };
  } else {
    infoIconProps.onMouseEnter = () => {
      toggleMetaData();
    };
    metaDataListProps.onMouseLeave = (e) => {
      e.stopPropagation();
      toggleMetaData();
    };
  }

  useEffect(() => {
    if (imageToExtractFrom === null) {
      return;
    }
    extractMetaData(imageToExtractFrom).then(
      (metadata) => {
        setMetadata(metadata);
        if (metaDataCallback) {
          metaDataCallback(metadata);
        }
      },
      (error) => {
        throw error;
      },
    );
  }, [imageToExtractFrom]);

  useEffect(() => {
    if (file) {
      setImageToExtractFrom(file);
    }

    if (imageSrc === "") {
      const newSource = file ? URL.createObjectURL(file) : imageUrl;
      if (typeof newSource === "string") {
        setImageSrc(newSource);
      }
    }
  }, [file]);

  useEffect(() => {
    if (imageFilePromise) {
      imageFilePromise
        .then((promisedFile) => {
          setFile(promisedFile);
          setImageToExtractFrom(promisedFile);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const renderCustomComponent = useCallback(() => {
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
  }, [metadata, component, componentMetadata]);

  const iconClassName = styles["icon-overlay"];
  const iconDisplayClassName = styles["icon-overlay--display"];
  const iconPositionClassName = styles[`icon-overlay--${positionSuffix}`];

  return (
    <div data-testid="metadata-card" className={styles["metadata-card"]}>
      <img
        src={imageSrc}
        alt=""
        onLoad={(event) => {
          if (!file) {
            handleImageLoaded(event, setImageToExtractFrom);
          }
        }}
      />
      <div
        data-testid="hover-icon"
        className={
          !showMetaData
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
