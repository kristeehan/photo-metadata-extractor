import { createRoot } from "react-dom/client";
import { useState } from "react";
import { exifMetaData } from "./interfaces";
import MetaDataCard from "./MetaDataCard";

async function fetchOneImage() {
  const url = `https://d1qahebwsbtmqz.cloudfront.net/toy_gallery_one/toy-photo-1.jpg`;
  const response = await fetch(url);
  return response.blob();
}

const exampleCallback = function ({ height, width }: exifMetaData) {
  console.log(`Height: ${height}, Width: ${width}`);
};

function Example() {
  const [imageSelected, setImageSelected] = useState(null as File | null);

  const filePromise = fetchOneImage().then((blob) => {
    const file = new File([blob], "downloaded_image.jpg", {
      type: "image/jpg",
    });
    return file;
  });

  function fileSelectHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const { files } = target as HTMLInputElement;
    if (!files) return;
    const file = files[0];
    console.log("", file.name);
    //const imageUrl = URL.createObjectURL(file);
    setImageSelected(file);
    //setImageSrc(imageUrl);
  }

  return (
    <div className="example-container">
      <form>
        <p>
          <label htmlFor="file-select">Select a file:</label>
        </p>
        <p>
          <input
            type="file"
            id="file-select"
            name="file-select"
            onChange={fileSelectHandler}
          />
        </p>
      </form>

      <div className="card-container">
        {imageSelected && (
          <MetaDataCard
            imageFile={imageSelected}
            showOnClick={false}
            metaDataPosition="top-left"
            metaDataCallback={exampleCallback}
          />
        )}
      </div>
      <div className="card-container">
        <MetaDataCard
          imageFilePromise={filePromise}
          showOnClick={true}
          metaDataPosition="top-left"
          metaDataNotToDisplay={["description"]}
        />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element");
const root = createRoot(container);
root.render(<Example />);

export default Example;
