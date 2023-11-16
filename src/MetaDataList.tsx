import { keyToLabelMap } from "./constants";
import { MetaDataListProps } from "./interfaces";

function MetaDataList(props: MetaDataListProps) {
  const { metadata, showMetaData, positionSuffix, onMouseLeave } = props;

  return (
    <ul
      data-testid="metadata-list"
      className={
        showMetaData
          ? `metadata-list metadata-list--display metadata-list--${positionSuffix}`
          : `metadata-list metadata-list--${positionSuffix}`
      }
      onMouseLeave={onMouseLeave}
    >
      {Object.entries(metadata).map(([key, value]) => (
        <li key={key}>
          <strong>{keyToLabelMap[key] ? keyToLabelMap[key] : key}</strong>:{" "}
          {value}
        </li>
      ))}
    </ul>
  );
}

export default MetaDataList;
