import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { keyToLabelMap } from "../constants";
import MetaDataList from "../MetaDataList";

const metadata = {
  shutterSpeed: "1/100",
  author: "John Doe",
  date: "2022-01-01",
};

describe("MetaDataList", () => {
  it("Renders metadata list with correct class when showMetaData is true", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={true}
        positionSuffix="top-left"
      />,
    );
    const metadataList = screen.getByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "true",
    ).toBeTruthy();
    list.unmount();
  });
  it("Renders metadata list with correct class when showMetaData is false", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={false}
        positionSuffix="bottom-right"
      />,
    );
    const metadataList = screen.getByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "false",
    ).toBeTruthy();
    list.unmount();
  });
  it("Renders metadata list with opacity class when onMouseLeave is not undefined", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={true}
        positionSuffix="bottom-left"
        onMouseLeave={() => {}}
      />,
    );
    const metadataList = screen.getByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    list.unmount();
  });
  it("Renders metadata items correctly", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={true}
        positionSuffix="top-right"
      />,
    );
    const metadataItems = screen.getAllByRole("listitem");
    expect(metadataItems).toHaveLength(Object.keys(metadata).length);
    for (let i = 0; i < metadataItems.length; i++) {
      const metadataItem = metadataItems[i];
      const metadataKey = metadataItem.querySelector("strong");
      const metadataValue = metadataItem.querySelector(
        "span[data-testid=value]",
      );
      expect(metadataKey).toBeTruthy();
      expect(metadataValue).toBeTruthy();
      expect(metadataKey?.textContent).toBe(
        keyToLabelMap[Object.keys(metadata)[i]],
      );
      expect(metadataValue?.textContent).toBe(Object.values(metadata)[i]);
    }
    list.unmount();
  });
});
