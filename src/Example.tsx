import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { exifMetaData } from "./interfaces";
import getExampleAssets from "./get-example-assets";
import MetaDataCard from "./MetaDataCard";

interface ExampleComponentProps {
  description: string;
}

async function fetchOneImage() {
  const url = `https://d1qahebwsbtmqz.cloudfront.net/toy_gallery_one/toy-photo-2.jpg`;
  const response = await fetch(url);
  return response.blob();
}

console.log(fetchOneImage());

const ExampleComponent: React.FC<ExampleComponentProps> = (props) => {
  return (
    <div>
      <p>{props.description}</p>
    </div>
  );
};

const exampleCallback = function ({ height, width }: exifMetaData) {
  console.log(`Height: ${height}, Width: ${width}`);
};

function Example() {
  const [imageSelected, setImageSelected] = useState(null as File | null);
  const [imageSrc, setImageSrc] = useState("");
  const [exampleAssets, setExampleAssets] = useState(null as File[] | null);
  const [examplePromise, setExamplePromise] = useState(
    null as Promise<Blob> | null,
  );

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
    const imageUrl = URL.createObjectURL(file);
    setImageSelected(file);
    setImageSrc(imageUrl);
  }

  useEffect(() => {
    getExampleAssets()
      .then((blobs) => {
        const files: File[] = [];
        blobs.forEach((blob) => {
          const file = new File([blob], "downloaded_image.jpg", {
            type: "image/jpg",
          });
          files.push(file);
        });
        setExampleAssets(files);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
            imageUrl={imageSrc}
            showOnClick={false}
            metaDataPosition="top-left"
            metaDataCallback={exampleCallback}
            component={ExampleComponent}
            componentMetadata={{ keys: ["description"] }}
          />
        )}
      </div>
      <div className="card-container"></div>
      <div className="card-container">
        <MetaDataCard
          imageFilePromise={filePromise}
          showOnClick={true}
          metaDataPosition="top-left"
        />
      </div>
      {/* <div className="card-container">
        <MetaDataCard
          imageUrl="/example_assets/example-photo-2.jpg"
          showOnClick={true}
          metaDataPosition="top-left"
        />
      </div> */}
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element");
const root = createRoot(container);
root.render(<Example />);

export default Example;
