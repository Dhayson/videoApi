"use client"

import { useState } from "react"
import { Search, Trash2, Plus, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { MainLayout } from "@/components/main-layout"

const mockTasks = [
  { id: 1, name: "Nome da task 1", date: "10/07/2023", status: "active" },
  { id: 2, name: "Nome da task 2", date: "11/07/2023", status: "active" },
  { id: 3, name: "Nome da task 3", date: "10/07/2023", status: "active" },
  { id: 4, name: "Nome da task 4", date: "11/07/2023", status: "active" },
  { id: 5, name: "Nome da task 5", date: "10/07/2023", status: "active" },
  { id: 6, name: "Nome da task 6", date: "11/07/2023", status: "active" },
]

const mockAlteracoes = [
  { id: 1, name: "Alteração 1", status: "active" },
  { id: 2, name: "Alteração 2", status: "inactive" },
  { id: 3, name: "Alteração 1", status: "active" },
  { id: 4, name: "Alteração 2", status: "inactive" },
  { id: 5, name: "Alteração 2", status: "inactive" },
  { id: 6, name: "Alteração 2", status: "inactive" },
  { id: 7, name: "Alteração 1", status: "active" },
  { id: 8, name: "Alteração 1", status: "active" },
  { id: 9, name: "Alteração 1", status: "active" },
  { id: 10, name: "Alteração 2", status: "inactive" },
  { id: 11, name: "Alteração 2", status: "inactive" },
  { id: 12, name: "Alteração 2", status: "inactive" },
]

export default function ProjetoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tasks, setTasks] = useState(mockTasks)
  const [alteracoes, setAlteracoes] = useState(mockAlteracoes)
  const [selectedAlteracao, setSelectedAlteracao] = useState<string | null>(null)

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleCreateTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: "Nova task",
      date: new Date().toLocaleDateString(),
      status: "active",
    }
    setTasks([...tasks, newTask])
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Coluna das tarefas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Tasks do projeto</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Pesquisar..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-4 text-sm font-medium text-gray-500 mb-2">
            <div className="col-span-2">Nome da Task</div>
            <div className="text-center">date</div>
            <div className="text-center">Status</div>
          </div>

          <div className="scroll-slim max-h-[610px] overflow-y-auto space-y-2 pr-1">
            {filteredTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-4 items-center py-2 border-b border-gray-100">
                <div className="col-span-2 text-sm">{task.name}</div>
                <div className="text-center text-sm">{task.date}</div>
                <div className="flex justify-center items-center space-x-2">
                  <div className={`h-4 w-4 rounded-full ${task.status === "active" ? "bg-blue-500" : "bg-gray-500"}`} />
                  <button onClick={() => handleRemoveTask(task.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleCreateTask} className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
            Create new task
            <Plus className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>

        </Card>

        {/* Coluna com vídeo e alterações */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Logo className="h-8 w-8" />
                <CardTitle className="text-xl text-blue-600">Nome do projeto</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Representação do vídeo (real, sem player fake) */}
              <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
                <video
                  src="/videos/exemplo.mp4"
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Alterações e formulário */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Alterações requisitadas</h3>

                  <div className="bg-gray-100 rounded-lg h-[250px] overflow-hidden flex flex-col">
                    {/* Cabeçalho fixo */}
                    <div className="grid grid-cols-2 text-sm font-medium text-gray-500 px-3 py-2 border-b border-gray-200">
                      <span>Nome</span>
                      <span className="text-right">Status</span>
                    </div>

                    {/* Lista com scroll */}
                    <div className="flex-1 overflow-y-auto scroll-slim px-3 py-2 space-y-2">
                      {alteracoes.map((alteracao) => (
                        <div key={alteracao.id} className="flex justify-between items-center text-sm">
                          <span className="flex items-center space-x-2">
                            <span>•</span>
                            <span>{alteracao.name}</span>
                          </span>
                          <div
                            className={`h-4 w-4 rounded-full ${
                              alteracao.status === "active" ? "bg-blue-500" : "bg-gray-500"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between h-[280px]">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Selecione a alteração</h3>
                    <Select onValueChange={setSelectedAlteracao}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {alteracoes.map((alteracao) => (
                          <SelectItem key={alteracao.id} value={`alteracao-${alteracao.id}`}>
                            {alteracao.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedAlteracao && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Descreva a alteração</h3>
                    <Textarea placeholder="Descrição da alteração..." className="h-20" />
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="text-blue-500 border-blue-500">
                      Enviar Arquivo
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Enviar
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
