/** @jsxImportSource preact */

import { Fragment, useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Spinner } from "./Spinner";

type Asset = { name: string; url: string };

const getAssets = async (): Promise<{ version: string; assets: Asset[] }> => {
  const release = await fetch(
    "https://updater.egoist.dev/github/egoist/toolcat/latest",
    {
      headers: {},
    }
  ).then((res) => res.json());

  const assets = release.assets
    .map((a: any) => {
      if (a.name.endsWith(".dmg")) {
        return {
          name: a.name.endsWith("_x64.dmg")
            ? "macOS (Intel)"
            : "macOS (Apple Silion)",
          url: `https://updater.egoist.dev/github/download-asset?${new URLSearchParams(
            {
              asset: a.url,
              filename: a.name,
            }
          ).toString()}`,
        };
      }
      return null;
    })
    .filter(Boolean);

  return { version: release.name, assets };
};

export const AppDownloadButton = () => {
  const [show, setShow] = useState(false);

  const [version, setVersion] = useState<string | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => {
    setShow(false);
  });

  useEffect(() => {
    getAssets().then(({ assets, version }) => {
      setAssets(assets);
      setVersion(version);
    });
  }, []);

  return (
    <div className="relative">
      <button
        className="border h-12 inline-flex items-center px-3 rounded-lg bg-zinc-100 font-semibold text-zinc-600 active:bg-zinc-200 active:border-zinc-300"
        onClick={() => setShow((v) => !v)}
      >
        <span className="i-lucide-download mr-2"></span>
        Download
      </button>
      {show && (
        <div
          ref={dropdownRef}
          className="absolute pt-2 -translate-x-1/2 left-1/2"
        >
          <div className="shadow-popover rounded-lg w-[200px] bg-white/90 backdrop-blur-lg py-2 animate-in zoom-in-90">
            {version ? (
              <Fragment>
                <div className="font-medium text-xs text-zinc-400 px-4 my-2">
                  Latest: {version}
                </div>
                {assets.map((asset) => {
                  return (
                    <a
                      key={asset.name}
                      href={asset.url}
                      className="whitespace-nowrap flex px-4 h-10 items-center hover:bg-zinc-200"
                    >
                      {asset.name}
                    </a>
                  );
                })}
              </Fragment>
            ) : (
              <div className="min-h-[100px] w-[200px] flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
