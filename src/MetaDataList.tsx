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
import styles from "./metadatacard.module.css";

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
  description: Lightbulb,
};

function MetaDataList(props: MetaDataListProps) {
  const { metadata, showMetaData, positionSuffix, onMouseLeave } = props;
  const metaListClassName = styles["metadata-list"];
  const metaListDisplayClassName = styles["metadata-list--display"];
  const metaListPositionClassName = styles[`metadata-list--${positionSuffix}`];
  const metaListOpacityClassName = styles["metadata-list--display-opacity-one"];
  const iconWrapperClassName = styles["icon-wrapper"];

  let className = showMetaData
    ? `${metaListClassName} ${metaListDisplayClassName} ${metaListPositionClassName}`
    : `${metaListClassName} ${metaListPositionClassName}`;
  className += onMouseLeave !== undefined ? "" : ` ${metaListOpacityClassName}`;

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
            <span className={iconWrapperClassName}>
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
