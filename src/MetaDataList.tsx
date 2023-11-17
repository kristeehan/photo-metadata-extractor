import { keyToLabelMap } from "./constants";
import { MetaDataListProps } from "./interfaces";

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
      {Object.entries(metadata).map(([key, value]) => (
        <li key={key}>
          <strong>{keyToLabelMap[key] ? keyToLabelMap[key] : key}</strong>:{" "}
          {value}
        </li>
      ))}
      {props.children}
    </ul>
  );
}

export default MetaDataList;
