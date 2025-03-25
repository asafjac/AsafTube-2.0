import "./App.css";
import { Thumbnail } from "./components/thumbnail/Thumbnail.tsx";

function App() {
  return (
    <>
      <Thumbnail
        title={"Zamn"}
        duration={10}
        image={
          "https://ih1.redbubble.net/image.2935320636.8557/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg"
        }
      ></Thumbnail>
    </>
  );
}

export default App;
