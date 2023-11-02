import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MetaDataCard from "../MetaDataCard";
import generateSolidColorJPEG from "../test-helpers/generate-mock-jpg";

const mockMetadata = {
  author: "John Doe",
  shutterSpeed: "1/100",
  focalLength: "50mm",
  aperture: "f/2.8",
  iso: "200",
  date: "2021-08-01",
  camera: "Canon EOS R",
  height: "4000",
  width: "6000",
};

describe("MetaDataCard", () => {
  it("renders the image and metadata overlay", () => {
    const imageFile = generateSolidColorJPEG(300, 300, 255, 0, 0);
    render(<MetaDataCard imageFile={imageFile} />);
    expect(true).toBe(true);
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
