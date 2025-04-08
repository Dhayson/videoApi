"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { ProjectCard } from "@/components/project-card"
import { MainLayout } from "@/components/main-layout"

const mockProjects = [
  { id: 1, name: "Nome do Projeto", status: "active" },
  { id: 2, name: "Nome do Projeto", status: "active" },
  { id: 3, name: "Nome do Projeto", status: "inactive" },
  { id: 4, name: "Nome do Projeto", status: "inactive" },
  { id: 5, name: "Nome do Projeto", status: "inactive" },
  { id: 6, name: "Nome do Projeto", status: "active" },
  { id: 7, name: "Nome do Projeto", status: "inactive" },
  { id: 8, name: "Nome do Projeto", status: "active" },
  { id: 9, name: "Nome do Projeto", status: "inactive" },
  { id: 10, name: "Nome do Projeto", status: "inactive" },
  { id: 11, name: "Nome do Projeto", status: "inactive" },
  { id: 12, name: "Nome do Projeto", status: "inactive" },
  { id: 13, name: "Nome do Projeto", status: "inactive" },
  { id: 14, name: "Nome do Projeto", status: "inactive" },
  { id: 15, name: "Nome do Projeto", status: "inactive" },
  { id: 16, name: "Nome do Projeto", status: "inactive" },
  { id: 17, name: "Nome do Projeto", status: "inactive" },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState(mockProjects)

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRemoveProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-[calc(100vh-100px)]">
        {/* Coluna da esquerda */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Meus Projetos</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Pesquisar..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col justify-between flex-1">
            <div>
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500 mb-2">
                <div className="col-span-2">Nome do projeto</div>
                <div className="text-center">Status</div>
                <div className="text-center">Remover</div>
              </div>

              <div className="overflow-y-auto max-h-[550px] pr-1 space-y-2">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="grid grid-cols-4 items-center py-2 border-b border-gray-100">
                    <div className="col-span-2 flex items-center space-x-2">
                      <div className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center text-xs">P</div>
                      <Link
                        href={`/projeto/${project.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {project.name}
                      </Link>
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`h-4 w-4 rounded-full ${
                          project.status === "active" ? "bg-blue-500" : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleRemoveProject(project.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Link href="/criar-projeto">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Criar novo projeto
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Coluna da direita */}
        <div className="md:col-span-2 flex flex-col gap-4 h-full">
          {/* Bloco de estatísticas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Logo className="h-8 w-8" />
                <CardTitle className="text-xl text-blue-600">Hello $nome</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Card className="bg-gray-100">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Estatísticas</h3>
                  <div className="space-y-1 text-sm">
                    <p>Número total de projetos concluídos</p>
                    <p>Número total de empresas parceiras</p>
                    <p>Taxa de engajamento</p>
                    <p>Número de visualizações</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Bloco de destaque colado abaixo */}
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-700">Projetos de destaque</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <ProjectCard
                  title="Projeto 1"
                  notifications={5}
                  engagementRate={75}
                  videoSrc="/videos/projeto-1.jpg"
                  className="h-full" // <-- importante se o componente aceitar props de classe
                />
                <ProjectCard
                  title="Projeto 2"
                  notifications={3}
                  engagementRate={60}
                  videoSrc="/videos/projeto-2.jpg"
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
