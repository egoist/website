/** @jsxImportSource preact */

import clsx from "clsx";
import { useState } from "react";

export const AppPreviews = ({
  previews,
}: {
  previews: { name: string; image: astroHTML.JSX.ImgHTMLAttributes }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div class="my-20 lg:w-[140%] lg:-ml-[20%]">
      <div class="flex flex-wrap gap-2 max-w-3xl mx-auto justify-center text-sm">
        {previews.map((preview, index) => {
          const active = activeIndex == index;
          return (
            <button
              type="button"
              key={preview.name}
              class={clsx(
                "h-10 inline-flex items-center px-3 rounded-lg",
                active ? "bg-zinc-200" : "hover:bg-zinc-100"
              )}
              onClick={() => setActiveIndex(index)}
            >
              {preview.name}
            </button>
          );
        })}
      </div>
      {previews.map((preview, index) => {
        return (
          <div
            class={clsx(index === activeIndex ? "block" : "hidden")}
            key={preview.name}
          >
            <img
              src={preview.image.src || undefined}
              width={preview.image.width || undefined}
              height={preview.image.height || undefined}
              alt={preview.image.alt || undefined}
              decoding={preview.image.decoding || undefined}
            />
          </div>
        );
      })}
    </div>
  );
};
