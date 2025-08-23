import { keyToLabelMap } from "./constants";
import { MetaDataListProps, LabelToIconMap } from "./interfaces";
import { MetaDataLabelIconProps } from "./types";
import {
  FaUserCircle,
  FaClock,
  FaEye,
  FaDotCircle,
  FaLightbulb,
  FaCalendar,
  FaCamera,
  FaRuler,
  FaAlignLeft,
} from "react-icons/fa";
import styles from "./metadatacard.module.css";

export const labelToIconMap: LabelToIconMap = {
  author: FaUserCircle,
  shutterSpeed: FaClock,
  focalLength: FaEye,
  aperture: FaDotCircle,
  iso: FaLightbulb,
  date: FaCalendar,
  camera: FaCamera,
  height: FaRuler,
  width: FaRuler,
  description: FaAlignLeft,
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
      data-test-showmetadata={showMetaData}
      className={className}
      onMouseLeave={onMouseLeave}
      data-test-position={positionSuffix}
    >
      {Object.entries(metadata).map(([key, value]) => {
        if (!value) return null;
        const iconProps: MetaDataLabelIconProps = {
          color: "#fff",
          "data-testid": `metadata-list-icon=${key}`,
        };
        const Icon = labelToIconMap[key];
        const testId = `metadata-list-item-${key}`;
        return (
          <li key={key} data-testid={testId}>
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
