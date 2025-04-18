import React from 'react'
import SemihsBagsLogoMinimal from '../assets/logos/semihsBagsLogoMinimal'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 flex items-center">
                        <SemihsBagsLogoMinimal size="small" color="#FFFFFF" />
                        <span className="ml-2 text-xl font-semibold text-white">Semih's Bags</span>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm">Copyright {new Date().getFullYear()}</p>
                        <p className="text-sm">All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
