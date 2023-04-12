import {StrictMode, useEffect, useState} from "react";
import ReactDOM from "react-dom";

import Logger from "@foxglove/log";
import {IDataSourceFactory} from "@foxglove/studio-base";

import VersionBanner from "./VersionBanner";
import axios from "axios";
import {PropagateLoader} from "react-spinners";


const log = Logger.getLogger(__filename);

function LogAfterRender(props: React.PropsWithChildren<unknown>): JSX.Element {
  useEffect(() => {
    // Integration tests look for this console log to indicate the app has rendered once
    const level = log.getLevel();
    log.setLevel("debug");
    log.debug("App rendered");
    log.setLevel(level);
  }, []);
  return <>{props.children}</>;
}

type MainParams = {
  dataSources?: IDataSourceFactory[];
  extraProviders?: JSX.Element[];
};

function UrlForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:5000/time_to_mcap", {url: inputUrl}, {
        responseType: "blob",
      }).then(response => {
        // Create a temporary URL that points to the downloaded file
        const fileUrl = URL.createObjectURL(new Blob([response.data]));

        // Create a link and simulate a click to download the file
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "file.mcap";
        link.click();

        // Clean up the temporary URL
        URL.revokeObjectURL(fileUrl);
      }).catch(error => {
        console.error("API request failed:", error);
      });
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form onSubmit={onSubmit}>
        <input
            type="text"
            value={inputUrl}
            onChange={(event) => setInputUrl(event.target.value)}
        />
        <button type="submit">Submit</button>
        {isLoading ? <PropagateLoader /> : null}
      </form>
  );
}

export async function main(params: MainParams = {}): Promise<void> {
  log.debug("initializing");

  window.onerror = (...args) => {
    console.error(...args);
  };

  const rootEl = document.getElementById("root");
  if (!rootEl) {
    throw new Error("missing #root element");
  }

  const chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)\./);
  const chromeVersion = chromeMatch ? parseInt(chromeMatch[1] ?? "", 10) : 0;
  const isChrome = chromeVersion !== 0;

  const canRenderApp = typeof BigInt64Array === "function" && typeof BigUint64Array === "function";
  const banner = (
    <VersionBanner
      isChrome={isChrome}
      currentVersion={chromeVersion}
      isDismissable={canRenderApp}
    />
  );

  if (!canRenderApp) {
    ReactDOM.render(
      <StrictMode>
        <LogAfterRender>{banner}</LogAfterRender>
      </StrictMode>,
      rootEl,
    );
    return;
  }

  const { installDevtoolsFormatters, overwriteFetch, waitForFonts, initI18n } = await import(
    "@foxglove/studio-base"
  );
  installDevtoolsFormatters();
  overwriteFetch();
  // consider moving waitForFonts into App to display an app loading screen
  await waitForFonts();
  await initI18n();

  const { Root } = await import("./Root");

  ReactDOM.render(
    <StrictMode>
      <LogAfterRender>
        {banner}
        <UrlForm />
        <Root extraProviders={params.extraProviders} dataSources={params.dataSources} />
      </LogAfterRender>
    </StrictMode>,
    rootEl,
  );
}
