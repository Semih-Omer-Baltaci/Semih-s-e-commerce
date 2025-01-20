import React from 'react'
import footerLogo from '../assets/images/Footerum.jpg'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <img src="./assets/Footerum.jpg" alt="Footer logo" className="h-12" />
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
