import type React from "react"
import Link from "next/link"
import { Home, User, FolderPlus, LogOut } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Plataforma de Projetos</h1>
          <nav className="flex items-center space-x-4">
            <Link href="/home" className="text-gray-600 hover:text-blue-500">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/perfil" className="text-gray-600 hover:text-blue-500">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/criar-projeto" className="text-gray-600 hover:text-blue-500">
              <FolderPlus className="h-5 w-5" />
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-500">
              <LogOut className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-white py-4 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Plataforma de Projetos Multimídia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

