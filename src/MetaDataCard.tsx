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

/**
 * Component that displays the metadata of a photo and the photo itself.
 */
function MetaDataCard({
  imageFile,
  imageUrl,
  metaDataPosition = "top-left",
  showOnClick = false,
}: MetaDataCardProps) {
  const [showMetaData, setShowMetaData] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [metadata, setMetadata] = useState({} as exifMetaData);
  const [image, setImage] = useState(null as File | null);
  const positionSuffix = metaDataPosition;
  const infoIconProps: InfoIconProps = {};
  const closeIconProps: CloseIconProps = {};
  const metaDataListProps: MetaDataListProps = {
    metadata,
    showMetaData,
    positionSuffix,
  };
  const imageSrc = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

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

  function handleImageLoaded(event: React.SyntheticEvent<HTMLImageElement>) {
    if (!imageFile) {
      const img = event.target as HTMLImageElement;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function (blob: Blob | null) {
        if (!blob) {
          throw new Error("Something went wrong while converting to blob");
        }
        const file = new File([blob], "downloaded_image.png", {
          type: "image/png",
        });
        canvas.remove();
        setImage(file);
      }, "image/png");
    } else {
      setImage(imageFile);
    }
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

  return (
    <div data-testid="metadata-card" className="metadata-card">
      <img src={imageSrc} alt="" onLoad={handleImageLoaded} />
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
