"use client"

import { useState, useEffect } from "react"

interface Dont {
    _id: string;
    dont: string;
    userId: string;
}

export default function DontsCard(){
    const [dont, setDont] = useState('')
    const [donts, setDonts] = useState<Dont[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDonts()
    }, [])

    async function fetchDonts(){
        try {
            const data = await fetch('/api/Donts')
            const res = await data.json()
            if (res.donts) {
                setDonts(res.donts)
            }
        } catch (error) {
            console.error("Failed to fetch donts", error)
        } finally {
            setIsLoading(false)
        }
    }

    async function addDont(e: React.FormEvent){
        e.preventDefault()
        if (!dont.trim()) return

        try {
            const res = await fetch('/api/Donts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dont })
            })
            if (res.ok) {
                setDont('')
                fetchDonts()
            }
        } catch (error) {
            console.error("Failed to add dont", error)
        }
    }

    async function deleteDont(id: string){
        try {
            const res = await fetch(`/api/Donts?id=${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setDonts(prev => prev.filter(d => d._id !== id))
            }
        } catch (error) {
            console.error("Failed to delete dont", error)
        }
    }

    return (
        <div className="bg-black/20 rounded-2xl border border-white/5 p-6 sm:p-8 flex flex-col w-full min-h-[450px] h-auto transition-all duration-500 relative">
            
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl sm:text-3xl font-semibold mb-10 text-white font-poppins tracking-wide">Things to avoid</h2>
            </div>
            
            <form onSubmit={addDont} className="mb-6 flex w-full gap-3">
                <input 
                    value={dont} 
                    onChange={(e) => setDont(e.target.value)} 
                    type="text" 
                    placeholder="What to avoid?" 
                    className="flex-1 italic text-sm text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:bg-white/10 focus:ring-1 focus:border-white/30 focus:outline-none transition-all duration-300 placeholder-white/30"
                />
                <button type="submit" className="text-white bg-white/10 border border-white/10 font-medium rounded-xl px-4 py-2.5 hover:bg-white/20 transition-all duration-300">
                    Add
                </button>
            </form>

            <div className="flex flex-col gap-2 pr-2 flex-grow">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-white/20 italic text-sm font-light mt-10">
                        Loading...
                    </div>
                ) : donts.length > 0 ? (
                    donts.map((d) => (
                        <div key={d._id} className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300">
                            <span className="text-sm font-light text-white/80">{d.dont}</span>
                            <button 
                                onClick={() => deleteDont(d._id)}
                                className="cursor-pointer text-[11px] uppercase tracking-wider text-red-400/30 md:text-transparent md:group-hover:text-red-400/80 hover:!text-red-400 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-white/20 italic text-sm font-light mt-10">
                        No anti-goals yet.
                    </div>
                )}
            </div>
        </div>
    )
}