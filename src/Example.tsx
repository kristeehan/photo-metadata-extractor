import { createRoot } from "react-dom/client";
import { useState } from "react";
import MetaDataCard from "./MetaDataCard";

function Example() {
  const [imageSelected, setImageSelected] = useState(null as File | null);

  function fileSelectHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const { files } = target as HTMLInputElement;
    if (!files) return;
    const file = files[0];
    setImageSelected(file);
  }

  return (
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
      <div className="card-container">
        {imageSelected && (
          <MetaDataCard
            imageFile={imageSelected}
            showOnClick={true}
            metaDataPosition="top-left"
          />
        )}
      </div>
    </form>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element");
const root = createRoot(container);
root.render(<Example />);

export default Example;
