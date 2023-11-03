import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MetaDataCard from "../MetaDataCard";

const imagePath = path.join(__dirname, "assets", "test-image.jpg");
const imageBuffer = fs.readFileSync(imagePath);
// Create a Blob from the binary data
const blob = new Blob([imageBuffer], { type: "image/jpeg" });
const file = new File([blob], "test-image.jpg", { type: "image/jpeg" });

describe("MetaDataCard", () => {
  it("Renders", () => {
    // Fetch the mock JPEG file from the public folder
    const card = render(<MetaDataCard imageFile={file} />);
    // verify rendered component
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
    const hoverIcon = await screen.findByTestId("hover-icon");
    fireEvent.mouseEnter(hoverIcon);
    const metadataList = await screen.findByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    card.unmount();
  });

  it("Hides the metadata list on mouse leave of metadata list", async () => {
    const card = render(<MetaDataCard imageFile={file} />);
    const hoverIcon = await screen.findByTestId("hover-icon-svg");
    fireEvent.mouseEnter(hoverIcon);
    const metadataList = await screen.findByTestId("metadata-list");
    expect(metadataList).toBeTruthy();
    console.log(metadataList.classList.toString(), " our class list");
    expect(
      metadataList.classList.contains("metadata-list--display"),
    ).toBeTruthy();
    fireEvent.mouseLeave(metadataList);
    expect(
      metadataList.classList.contains("metadata-list--display"),
    ).toBeFalsy();
    card.unmount();
  });

  // it("displays metadata on mouse hover", async () => {
  //   const imageFile = new File([], "test.jpg", { type: "image/jpeg" });
  //   render(<MetaDataCard imageFile={imageFile} />);
  //   const iconOverlay = screen.getByTestId("icon-overlay");
  //   fireEvent.hover(iconOverlay);
  //   const metadataList = await screen.findByTestId("metadata-list");
  //   expect(metadataList).toBeInTheDocument();
  //   Object.entries(mockMetadata).forEach(([key, value]) => {
  //     expect(screen.getByText(keyToLabelMap[key])).toBeInTheDocument();
  //     expect(screen.getByText(value)).toBeInTheDocument();
  //   });
  // });

  // it("hides metadata on mouse leave", async () => {
  //   const imageFile = new File([], "test.jpg", { type: "image/jpeg" });
  //   render(<MetaDataCard imageFile={imageFile} />);
  //   const iconOverlay = screen.getByTestId("icon-overlay");
  //   fireEvent.hover(iconOverlay);
  //   const metadataList = await screen.findByTestId("metadata-list");
  //   expect(metadataList).toBeInTheDocument();
  //   fireEvent.unhover(metadataList);
  //   expect(metadataList).not.toBeInTheDocument();
  // });
});
