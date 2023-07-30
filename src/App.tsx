import { useState } from "react";
import { Button } from "./components/ui/Button";
import { invoke } from "@tauri-apps/api/tauri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface HtmlResponse {
  ok: string;
  err?: string;
}

function App() {
const [isLoading, setIsLoading] = useState(false)
  const [htmlContent, setHtmlContent] = useState<string>("");



const handleFetchClick = async () => {
  console.log("Fetching HTML...");
  const url = "https://www.theweathernetwork.com/ca/weather/ontario/toronto"; // Replace with the URL you want to fetch

  try {
    const response = await invoke<HtmlResponse>(
      "fetch_html_command",
      { url }
    );
    console.log("Response:", response);
    if (response.err) {
      console.error(response.err);
    } else {
      setHtmlContent(response.ok);
    }
  } catch (error) {
    console.error("Error invoking fetch_html_command:", error);
  }
};
  return (
    <div className="bg-slate-900 text-slate-50 min-h-screen flex-col w-full flex justify-center items-center">
      <section className="flex justify-center items-center gap-5 bg-slate-950 p-5 rounded-lg shadow-lg">
        <Button
          className="flex justify-center items-center gap-2"
          onClick={handleFetchClick}
          variant={"secondary"}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : null}
          Read
        </Button>
        <Button variant={"ghost"}>Save</Button>
      </section>
      <pre>{htmlContent}</pre>
    </div>
  );
}

export default App;
