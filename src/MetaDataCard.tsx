import { extractMetaData } from "./photo-extractor";
import { exifMetaData } from "./meta-data-helpers";
import { useState, useEffect } from "react";

interface MetaDataCardProps {
  imageFile: File;
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
function MetaDataCard({ imageFile }: MetaDataCardProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  const [metadata, setMetadata] = useState(null as exifMetaData | null);

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
    <div className="metadata-card">
      <img
        src={URL.createObjectURL(imageFile)}
        alt=""
        onLoad={() => setImageHasLoaded(true)}
      />
      {metadata && (
        <ul className="metadata-list">
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
