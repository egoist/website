import clsx from "clsx"
import { useRouter } from "next/router"

const tabs = [
  { text: "🇬🇧 English", value: "" },
  { text: "🇨🇳 Chinese", value: "chinese" },
]

export const LanguageTabs = () => {
  const router = useRouter()
  const switchLang = (lang: string) => {
    router.push({ pathname: router.pathname, query: lang ? { lang } : {} })
  }

  return (
    <div className="inline-flex text-sm text-zinc-400 bg-zinc-100 darl:text-zinc-200 dark:bg-zinc-800 rounded-lg p-1 space-x-1">
      {tabs.map((tab) => {
        const active = tab.value === (router.query.lang || "")
        return (
          <button
            key={tab.value}
            type="button"
            className={clsx(
              `rounded-lg px-4 h-8 flex items-center font-semibold`,
              active
                ? `bg-white text-black dark:bg-dark dark:text-white shadow`
                : `hover:bg-zinc-50 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-200`
            )}
            onClick={() => switchLang(tab.value)}
          >
            {tab.text}
          </button>
        )
      })}
    </div>
  )
}
