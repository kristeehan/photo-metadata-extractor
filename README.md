# Photo Metadata Extractor

A React component for extracting EXIF metadata from images and displaying it in an overlay UI.

## Install

```bash
npm i @kteehan/photo-metadata-extractor
```

## Peer dependencies

This package expects:

- `react` `^18.2.0 || ^19.0.0`
- `react-dom` `^18.2.0 || ^19.0.0`

## Usage

```tsx
import { MetaDataCard, type exifMetaData } from "@kteehan/photo-metadata-extractor";

function App() {
  const handleMetaData = (metadata: exifMetaData) => {
    console.log(metadata);
  };

  return (
    <MetaDataCard
      imageUrl="https://example.com/photo.jpg"
      metaDataPosition="top-right"
      showOnClick
      metaDataNotToDisplay={["Make", "Model"]}
      metaDataCallback={handleMetaData}
    />
  );
}
```

You can also pass an uploaded file:

```tsx
<MetaDataCard imageFile={file} />
```

or a `Promise<File>`:

```tsx
<MetaDataCard imageFilePromise={filePromise} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `imageFile` | `File \| null` | `null` | Local image file to display and extract metadata from. |
| `imageFilePromise` | `Promise<File>` | `undefined` | Promise that resolves to a file to display/extract from. |
| `imageUrl` | `string` | `undefined` | Remote image URL to display and extract metadata from. |
| `metaDataPosition` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"top-left"` | Position of metadata overlay. |
| `showOnClick` | `boolean` | `false` | If `true`, metadata toggles on click; otherwise it appears on hover. |
| `hideMetaData` | `boolean` | `false` | Hide metadata UI entirely. |
| `metaDataCallback` | `(metadata) => void` | `undefined` | Receives extracted metadata object. |
| `metaDataNotToDisplay` | `string[]` | `[]` | Metadata keys to remove from rendered output. |

## Exports

- Default export: `MetaDataCard`
- Named export: `MetaDataCard`
- Types: `MetaDataCardProps`, `exifMetaData`

## License

ISC
