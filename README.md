# Photo Meta Extractor

Simple component for extracting photo metadata and displaying it.

## Installation

To install in your project, run

```
npm i @kteehan/photo-metadata-extractor
```

## Usage

Below are examples of how to use the `MetaDataCard` component in your project, with both an image file and an image URL:

### Example 1: Using an Image File

```tsx
import React from "react";
import MetaDataCard from "@kteehan/photo-metadata-extractor";

function App() {
  const handleMetaDataCallback = (metadata) => {
    console.log("Extracted Metadata:", metadata);
  };

  // Example image file (replace this with an actual File object in your implementation)
  const exampleImageFile = new File([""], "example-photo.jpg", {
    type: "image/jpeg",
  });

  return (
    <div style={{ margin: "20px" }}>
      <h1>Photo Metadata Extractor</h1>
      <MetaDataCard
        imageFile={exampleImageFile} // Pass an example image file
        imageFilePromise={null} // Pass a Promise resolving to an image file if applicable
        imageUrl="" // Leave empty if an image file is provided
        metaDataPosition="top-right" // Position of the metadata overlay (e.g., "top-left", "top-right", etc.)
        showOnClick={true} // Set to true to show metadata on click, false for hover
        metaDataCallback={handleMetaDataCallback} // Callback function to handle extracted metadata
        metaDataNotToDisplay={["Make", "Model"]} // Specify metadata keys to exclude from display
      />
    </div>
  );
}

export default App;
```

### Example 2: Using an Image URL

```tsx
import React from "react";
import MetaDataCard from "@kteehan/photo-metadata-extractor";

function App() {
  const handleMetaDataCallback = (metadata) => {
    console.log("Extracted Metadata:", metadata);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Photo Metadata Extractor</h1>
      <MetaDataCard
        imageFile={null} // No image file provided
        imageFilePromise={null} // No promise provided
        imageUrl="https://example.com/sample-photo.jpg" // Pass an example image URL
        metaDataPosition="top-left" // Position of the metadata overlay (e.g., "top-left", "top-right", etc.)
        showOnClick={false} // Set to false to show metadata on hover
        metaDataCallback={handleMetaDataCallback} // Callback function to handle extracted metadata
        metaDataNotToDisplay={["ISO", "ExposureTime"]} // Specify metadata keys to exclude from display
      />
    </div>
  );
}

export default App;
```
