import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MetaDataCard from "../MetaDataCard";

const imagePath = path.join(__dirname, "assets", "test-image.jpg");
const imageBuffer = fs.readFileSync(imagePath);
const blob = new Blob([imageBuffer], { type: "image/jpeg" });
const file = new File([blob], "test-image.jpg", { type: "image/jpeg" });

describe("MetaDataCard", () => {
  it("Renders", () => {
    const card = render(<MetaDataCard imageFile={file} />);
    expect(card.getByTestId("metadata-card")).toBeTruthy();
    card.unmount();
  });

  it('Renders when passed a string for "imageUrl"', () => {
    const card = render(<MetaDataCard imageUrl="assets/test-image.jpg" />);
    expect(card.getByTestId("metadata-card")).toBeTruthy();
    card.unmount();
  });

  it('displays the "Info" icon', async () => {
    const card = render(<MetaDataCard imageFile={file} />);
    await screen.findByTestId("hover-icon");
    expect(card.getByTestId("hover-icon")).toBeTruthy();
    card.unmount();
  });

  it("Renders the metadata list on mouse hover", async () => {
    const card = render(<MetaDataCard imageFile={file} />);
    const hoverIcon = await screen.findByTestId("info-icon-svg");
    fireEvent.mouseEnter(hoverIcon);
    const metadataList = await screen.findByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    const metadataListItem = await screen.findByTestId(
      "metadata-list-item-camera",
    );
    expect(metadataListItem).toBeTruthy();
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "true",
    ).toBeTruthy();
    card.unmount();
  });

  it("Hides the metadata list on mouse leave of metadata list", async () => {
    const card = render(<MetaDataCard imageFile={file} />);
    const hoverIcon = await screen.findByTestId("info-icon-svg");
    fireEvent.mouseEnter(hoverIcon);
    const metadataList = await screen.findByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "true",
    ).toBeTruthy();
    fireEvent.mouseLeave(metadataList);
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "false",
    ).toBeTruthy();
    card.unmount();
  });

  it("It adds the proper class when metaDataPosition is top-left", async () => {
    const card = render(
      <MetaDataCard imageFile={file} metaDataPosition="top-left" />,
    );
    const hoverIcon = await screen.findByTestId("info-icon-svg");
    fireEvent.mouseEnter(hoverIcon);
    const metadataList = await screen.findByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    expect(
      metadataList.getAttribute("data-test-position") === "top-left",
    ).toBeTruthy();
    card.unmount();
  });

  it("Uses click to show metadata when showOnClick is true", async () => {
    const card = render(<MetaDataCard imageFile={file} showOnClick={true} />);
    const hoverIcon = await screen.findByTestId("info-icon-svg");
    fireEvent.click(hoverIcon);
    const metadataList = await screen.findByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "true",
    ).toBeTruthy();
    card.unmount();
  });

  it("Shows the close icon after user clicks the info icon", async () => {
    const card = render(<MetaDataCard imageFile={file} showOnClick={true} />);
    const hoverIcon = await screen.findByTestId("info-icon-svg");
    fireEvent.click(hoverIcon);
    const closeIcon = await screen.findByTestId("close-icon");
    expect(closeIcon).toBeTruthy();
    card.unmount();
  });

  it("Clicking close button hides the metadata list", async () => {
    const card = render(<MetaDataCard imageFile={file} showOnClick={true} />);
    const hoverIcon = await screen.findByTestId("info-icon-svg");
    fireEvent.click(hoverIcon);
    const closeIcon = await screen.findByTestId("close-icon-svg");
    const metadataList = await screen.findByTestId("metadata-list");
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "true",
    ).toBeTruthy();
    fireEvent.click(closeIcon);
    expect(
      metadataList.getAttribute("data-test-showmetadata") === "false",
    ).toBeTruthy();
    card.unmount();
  });
});
