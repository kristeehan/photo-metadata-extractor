import { createRoot } from "react-dom/client";
import { extractMetaData, extractMetaDataFile } from "./photo-extractor";

function fileSelectHandler(event: React.ChangeEvent<HTMLInputElement>) {
  const { target } = event;
  const { files } = target as HTMLInputElement;
  if (!files) return;
  const file = files[0];
  extractMetaData(file).then(
    (metadata) => {
      console.log(metadata);
      console.log("in async version");
    },
    () => {},
  );

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const metadata = extractMetaDataFile(reader.result as ArrayBuffer);
    console.log(metadata);
    console.log("in sync version");
  };
}

function Example() {
  return (
    <form>
      <label htmlFor="file-select">Select a file:</label>
      <input
        type="file"
        id="file-select"
        name="file-select"
        onChange={fileSelectHandler}
      />
    </form>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element");
const root = createRoot(container);
root.render(<Example />);

export default Example;
