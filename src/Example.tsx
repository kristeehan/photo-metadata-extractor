import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import getExampleAssets from "./get-example-assets";
import MetaDataCard from "./MetaDataCard";

interface ExampleComponentProps {
  description: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = (props) => {
  console.log(props, " what do we have here");
  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

function Example() {
  const [imageSelected, setImageSelected] = useState(null as File | null);
  const [exampleAssets, setExampleAssets] = useState(null as File[] | null);

  function fileSelectHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const { files } = target as HTMLInputElement;
    if (!files) return;
    const file = files[0];
    setImageSelected(file);
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
            showOnClick={false}
            metaDataPosition="top-left"
            component={ExampleComponent}
            componentMetadata={{ keys: ["description"] }}
          />
        )}
      </div>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element");
const root = createRoot(container);
root.render(<Example />);

export default Example;
