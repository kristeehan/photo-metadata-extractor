import { extractMetaData } from "./photo-extractor";
import { exifMetaData } from "./meta-data-helpers";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";

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
  const [showMetaData, setShowMetaData] = useState(false);
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
      <div className="icon-overlay">
        <Info
          onMouseEnter={(e) => {
            e.stopPropagation();
            setShowMetaData(true);
          }}
          color="#fff"
        />
      </div>
      {metadata && (
        <ul
          className={
            showMetaData
              ? "metadata-list metadata-list--display"
              : "metadata-list"
          }
          onMouseLeave={(e) => {
            e.stopPropagation();
            setShowMetaData(false);
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
