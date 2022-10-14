import { Dialog } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import { Layout } from "~/components/Layout"
import { MarkdocContent } from "~/components/Markdoc"
import { renderMarkdown } from "~/lib/markdown"

const apis = [
    {
        section: "File system",
        items: [
            {
                node: "fs.access",
                deno: "Not implemented, but has workaround: https://github.com/denoland/deno/issues/16260",
            },
        ],
    },
    {
        section: "Child process",
        items: [
            {
                node: "child_process.exec",
                deno: "Deno.run",
            },
        ],
    },
]

export default function Page() {
    const router = useRouter()
    const selected = router.query.api as string | undefined

    const matched = useMemo(() => {
        if (!selected) return null

        const item = apis
            .flatMap((api) => api.items)
            .find((item) => (item.node === selected))
        if (!item) return null

        return {
            node: item.node,
            deno: renderMarkdown(item.deno).node,
        }
    }, [selected])

    return (
        <Layout title="Node to Deno Cheatsheet">
            <h2 className="page-title">
                <span>Node to Deno Cheatsheet</span>
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {apis.map((api, index) => {
                    return (
                        <div key={index}>
                            <h2 className="font-bold mb-1">{api.section}</h2>
                            {api.items.map((item, index) => {
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => router.push({ query: { api: item.node } })}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {item.node}
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>

            <Dialog
                open={!!matched}
                onClose={() => router.push({ query: {} })}
                className="relative z-50"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4 md:-mt-20">
                        {/* The actual dialog panel  */}
                        <Dialog.Panel className="mx-auto max-w-md w-full rounded bg-white">
                            <Dialog.Title className="px-3 h-10 items-center flex font-bold border-b">
                                {matched?.node}
                            </Dialog.Title>

                            <div className="p-3">
                                {matched?.deno && <MarkdocContent content={matched.deno} />}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Layout>
    )
}
