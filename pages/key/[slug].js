import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil"
import { userState } from "../../lib/atoms/userState"

export default function KeyCardEdit() {
    const router = useRouter()
    const { slug } = router.query
    const { token } = useRecoilValue(userState)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async ({ key, T, V }) => {
        console.log({ key, T, V })
        await fetch(`/api/key/${encodeURIComponent(key)}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({ T, V }),
        })
    }

    useEffect(() => {
        const get = async () => {
            Object.entries(
                await fetch(`/api/key/${encodeURIComponent(slug)}`).then(
                    (res) => res.json()
                )
            ).forEach(([oK, oV]) => {
                setValue(oK, oV)
            })
        }
        get()
    }, [setValue, slug])

    return (
        <>
            <div className="container mx-auto scrollbar-hide">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-8">
                        <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
                            <h2 className="text-2xl leading-tight md:pr-0 text-white">
                                <Link href="/">
                                    <a>KEYS</a>
                                </Link>
                                &nbsp;&gt; {slug}
                            </h2>
                            <div className="text-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="max-w-full h-screen overflow-x-auto shadow rounded-lg bg-gray-200 p-8">
                            <div className="grid grid-cols-1 gap-6 w-2/3">
                                <label className="block mt-2">
                                    <span className="text-gray-800">Key</span>
                                    <input
                                        className="mt-0 block w-full px-0.5 bg-gray-200 text-gray-800 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
                                        {...register("key", { required: true })}
                                        type="text"
                                    />
                                    {errors?.key && (
                                        <span>{errors.key.message}</span>
                                    )}
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-800">Type</span>
                                    <input
                                        className="mt-0 block w-full px-0.5 bg-gray-200 text-gray-800 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
                                        {...register("T", { required: true })}
                                        type="text"
                                    />
                                    {errors?.T && (
                                        <span>{errors.T.message}</span>
                                    )}
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-800">Value</span>
                                    <input
                                        className="mt-0 block w-full px-0.5 bg-gray-200 text-gray-800 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
                                        {...register("V", { required: true })}
                                        type="text"
                                    />
                                    {errors?.V && (
                                        <span>{errors.V.message}</span>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
