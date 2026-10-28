import React from 'react';

export const Navbar = () => {
    return (
        <>
            {/* NAVBAR */}
            <nav className="flex items-center justify-between bg-gray-900 px-6 py-4">
                {/* IZQUIERDA: Dashboard */}
                <a
                    href="#dashboard"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200"
                >
                    Dashboard
                </a>

                {/* DERECHA: Students + About */}
                <div className="flex items-center gap-6">
                    <a href="#" className="text-lg font-bold text-white">
                        Students
                    </a>
                    <a href="#about" className="text-slate-300 transition hover:text-white">
                        About
                    </a>
                </div>
            </nav>
        </>
    );
};
