export function handleImageLoaded(
  event: React.SyntheticEvent<HTMLImageElement>,
  imageFile: File | null,
  setImage: (file: File) => void,
) {
  if (!imageFile) {
    const img = event.target as HTMLImageElement;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    canvas.toBlob(function (blob: Blob | null) {
      if (!blob) {
        throw new Error("Something went wrong while converting to blob");
      }
      const file = new File([blob], "downloaded_image.png", {
        type: "image/png",
      });
      canvas.remove();
      setImage(file);
    }, "image/png");
  } else {
    setImage(imageFile);
  }
}

export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
