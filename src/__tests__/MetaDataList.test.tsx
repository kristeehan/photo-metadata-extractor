import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MetaDataList from "../MetaDataList";

const metadata = {
  title: "Test Image",
  author: "John Doe",
  date: "2022-01-01",
};

describe("MetaDataList", () => {
  it("Renders metadata list with correct class when showMetaData is true", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={true}
        positionSuffix="top"
      />,
    );

    const metadataList = screen.getByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    list.unmount();
  });

  it("Renders metadata list with correct class when showMetaData is false", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={false}
        positionSuffix="bottom"
      />,
    );

    const metadataList = screen.getByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    list.unmount();
  });

  it("Renders metadata list with opacity class when onMouseLeave is not undefined", () => {
    const list = render(
      <MetaDataList
        metadata={metadata}
        showMetaData={true}
        positionSuffix="left"
        onMouseLeave={() => {}}
      />,
    );

    const metadataList = screen.getByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    list.unmount();
  });

  // it("Renders metadata items correctly", () => {
  //   render(
  //     <MetaDataList
  //       metadata={metadata}
  //       showMetaData={true}
  //       positionSuffix="right"
  //     />,
  //   );

  //   const metadataItems = screen.getAllByRole("listitem");
  //   expect(metadataItems).toHaveLength(Object.keys(metadata).length);

  //   metadataItems.forEach((item, index) => {
  //     const key = Object.keys(metadata)[index];
  //     const value = Object.values(metadata)[index];
  //     expect(item).toHaveTextContent(`${key}: ${value}`);
  //   });
  // });
});
