interface photoMetadataFromReader {
  author?: string;
  focalLength?: string;
  iso?: string;
  shutterSpeed?: string;
  aperture?: string;
  date?: string;
}

export function getFileMetaData(
  fileResult: ArrayBufferLike,
): photoMetadataFromReader | null | undefined {
  console.log("making it here");
  const SOI = 0xffd8; // Start of Image
  const APP1 = 0xffe1; // Application Segment 1
  const EXIF = 0x45786966; // EXIF string
  const TIFF = 0x4949; // TIFF header

  let position = 0;
  let marker: number | null | undefined,
    littleEndian: boolean,
    IFD0Offset: number;
  // DataView provides a low-level API for reading and writing multiple number types in a binary ArrayBuffer, without having to care about the platform's endianness.
  const photoDataView = new DataView(fileResult);

  if (photoDataView.getUint16(position) !== SOI) {
    console.error("Invalid JPG");
    return;
  }

  position += 2;

  while (position < photoDataView.byteLength) {
    marker = photoDataView.getUint16(position);
    position += 2;

    if (marker === APP1) {
      console.log("found APP1");
      if (photoDataView.getUint32(position + 2, false) !== EXIF) {
        console.error("Not valid EXIF data");
        return;
      }

      littleEndian = photoDataView.getUint16(position + 10) === TIFF;
      IFD0Offset = photoDataView.getUint32(position + 14, littleEndian) + 6;

      // Retrieve the model tag (0x0110)
      const tags = photoDataView.getUint16(position + IFD0Offset, littleEndian);
      console.log(tags);
      for (let i = 0; i < tags; i++) {
        const tagOffset = position + IFD0Offset + 2 + i * 12;
        const tagId = photoDataView.getUint16(tagOffset, littleEndian);
        const tagLength = photoDataView.getUint32(position + 4, littleEndian);

        console.log(tagId === 0x0110);

        if (tagId === 0x0110) {
          console.log(tagLength);
          const modelOffset = position + 8;
          let modelString = "";
          console.log(modelOffset);
          console.log(
            String.fromCharCode(photoDataView.getUint8(modelOffset)),
            " huh",
          );
          for (let j = 0; j < tagLength; j++) {
            const char = photoDataView.getUint8(modelOffset + j);
            if (!char) break;
            if (char === 0) {
              // Null-terminator
              break;
            }
            modelString += String.fromCharCode(char);
          }

          console.log("Camera Model:", modelString);
          return;
        }
      }
    } else {
      position += photoDataView.getUint16(position) - 2;
    }
  }

  return null;
}
