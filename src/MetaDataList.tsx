import { keyToLabelMap } from "./constants";
import { MetaDataListProps, LabelToIconMap } from "./interfaces";
import { MetaDataLabelIconProps } from "./types";
import {
  Aperture,
  Calendar,
  Camera,
  Clock11,
  Lightbulb,
  Ruler,
  UserCircle2,
  View,
} from "lucide-react";

export const labelToIconMap: LabelToIconMap = {
  author: UserCircle2,
  shutterSpeed: Clock11,
  focalLength: View,
  aperture: Aperture,
  iso: Lightbulb,
  date: Calendar,
  camera: Camera,
  height: Ruler,
  width: Ruler,
};

function MetaDataList(props: MetaDataListProps) {
  const { metadata, showMetaData, positionSuffix, onMouseLeave } = props;
  let className = showMetaData
    ? `metadata-list metadata-list--display metadata-list--${positionSuffix}`
    : `metadata-list metadata-list--${positionSuffix}`;
  className +=
    onMouseLeave !== undefined ? "" : " metadata-list--display-opacity-one";

  return (
    <ul
      data-testid="metadata-list"
      className={className}
      onMouseLeave={onMouseLeave}
    >
      {Object.entries(metadata).map(([key, value]) => {
        if (!value) return null;
        const iconProps: MetaDataLabelIconProps = {
          color: "#fff",
          "data-testid": `metadata-list-icon=${key}`,
        };
        const Icon = labelToIconMap[key];
        return (
          <li key={key}>
            <span className="icon-wrapper">
              <Icon {...iconProps} />
            </span>
            <strong>{keyToLabelMap[key] ? keyToLabelMap[key] : key}</strong>:{" "}
            <span data-testid="value">{value}</span>
          </li>
        );
      })}
      {props.children}
    </ul>
  );
}

export default MetaDataList;
