import React from "react"
import { Link } from "react-router-dom"
import { CogIcon, BuildingIcon, FilesIcon, BlocksIcon } from "lucide-react"

export function Navbar() {
  return (
    <>
      {/* Sidebar for medium and larger screens */}
      <aside className="hidden md:flex md:flex-col md:items-center md:gap-4 md:bg-[#5C2D91] md:py-4 md:px-2 md:fixed md:left-0 md:top-0 md:h-full md:w-16 z-50">
        <NavLinks />
      </aside>

      {/* Top navbar for all screen sizes */}
      <header className="fixed top-0 left-0 right-0 bg-[#5C2D91] py-2 px-4 md:ml-16 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white md:text-2xl">CobbleDex</h1>
            <nav className="md:hidden flex items-center gap-4 ml-4">
              <NavLinks />
            </nav>
          </div>
        </div>
      </header>

      <div className="h-14 md:h-16"></div>
    </>
  )
}

function NavLinks() {
  return (
    <>
      <Link
        to="/"
        className="group flex h-10 w-10 items-center justify-center rounded-lg bg-[#4B2382] transition-colors hover:bg-[#7B4AA8]"
      >
        <CogIcon className="h-6 w-6 text-white group-hover:text-[#4B2382]" />
        <span className="sr-only">CobbleDex</span>
      </Link>
      <Link
        to="/team-builder"
        className="group flex h-10 w-10 items-center justify-center rounded-lg bg-[#4B2382] transition-colors hover:bg-[#7B4AA8]"
      >
        <BuildingIcon className="h-6 w-6 text-white group-hover:text-[#4B2382]" />
        <span className="sr-only">Team Builder</span>
      </Link>
      <Link
        to="/items"
        className="group flex h-10 w-10 items-center justify-center rounded-lg bg-[#4B2382] transition-colors hover:bg-[#7B4AA8]"
      >
        <FilesIcon className="h-6 w-6 text-white group-hover:text-[#4B2382]" />
        <span className="sr-only">Items</span>
      </Link>
      <Link
        to="/blocks"
        className="group flex h-10 w-10 items-center justify-center rounded-lg bg-[#4B2382] transition-colors hover:bg-[#7B4AA8]"
      >
        <BlocksIcon className="h-6 w-6 text-white group-hover:text-[#4B2382]" />
        <span className="sr-only">Blocks</span>
      </Link>
    </>
  )
}