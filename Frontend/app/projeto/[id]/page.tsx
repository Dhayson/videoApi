"use client"

import React, { useState,  useRef, useEffect } from "react"
import { Search, Trash2, Plus, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { MainLayout } from "@/components/main-layout"
import { VideoWithFeedback } from "@/components/video-with-feedback"
import { criarTask, deletarTask} from "../../../endpoints/tasks"

const mockTasks = [
  { id: 1, name: "Nome da task 1", date: "10/07/2023", status: "active" },
  { id: 2, name: "Nome da task 2", date: "11/07/2023", status: "active" },
]

const initialFeedbacks = [
  {
    id: 1,
    timestamp: 3,
    message: "Corrigir essa fala",
  },
  {
    id: 2,
    timestamp: 9,
    message: "Adicionar legenda aqui",
  }
]

const mockAlteracoes = [
  { id: 1, name: "Alteração 1", status: "active" },
  { id: 2, name: "Alteração 2", status: "inactive" },
]

export default function ProjetoPage() {
  const [projectId, setProjectId] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [tasks, setTasks] = useState(mockTasks)
  const [alteracoes, setAlteracoes] = useState(mockAlteracoes)
  const [selectedAlteracao, setSelectedAlteracao] = useState<string | null>(null)
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
  const [newFeedbackText, setNewFeedbackText] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dataEntrega)
    const Resposta = criarTask(
      titulo,
      descricao,
      prioridade,
      dataEntrega.toString(),
      projectId
    )
    console.log(Resposta)
    setMostrarForm(false)
  };

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');
  const [prioridade, setPrioridade] = useState('MEDIUM');
  const [dataEntrega, setDataEntrega] = useState('');

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    // Essa função roda uma vez, quando o componente monta (inicializa)
    const path = window.location.pathname;
    const partes = path.split('/');
    const id = partes[2];
    setProjectId(id);
    console.log(id)
  }, []); // <- Array com id

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const [mostrarForm, setMostrarForm] = useState(false);

  const handleCreateTask = () => {
    setMostrarForm(true);
  }

  const handleCreateFeedback = () => {
    if (!videoRef.current) return
    const timestamp = Math.floor(videoRef.current.currentTime)
    const newFeedback = {
      id: feedbacks.length + 1,
      timestamp,
      message: newFeedbackText
    }
    setFeedbacks([...feedbacks, newFeedback])
    setNewFeedbackText("")
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {mostrarForm && (
          <div className="modal" >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2>Nova Task</h2>

              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <div>
              <h1>Status:</h1>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluida">Concluída</option>
                </select>
              </div>

              <div>
              <h1>Prioridade:</h1>
              <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                <option value="baixa">MEDIUM</option>
                <option value="media">LOW</option>
                <option value="alta">HIGH</option>
                </select>
              </div>

              <input
                type="date"
                value={dataEntrega}
                onChange={(e) => setDataEntrega(e.target.value)}
              />

              <button type="submit">Criar</button>
              <button onClick={() => setMostrarForm(false)}>Cancelar</button>
            </form>
          </div>
        )}
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
            Criar nova task
            <Plus className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>

            <Button onClick={handleCreateTask} className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
              Create new task
              <Plus className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Logo className="h-8 w-8" />
                <CardTitle className="text-xl text-blue-600">Nome do projeto</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
                <VideoWithFeedback ref={videoRef} src="https://www.w3schools.com/html/mov_bbb.mp4" feedbacks={feedbacks} />
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-medium text-gray-700">Escreva um feedback</h3>
                <Textarea
                  placeholder="Digite seu feedback..."
                  className="h-20"
                  value={newFeedbackText}
                  onChange={(e) => setNewFeedbackText(e.target.value)}
                />
                <Button onClick={handleCreateFeedback} className="bg-green-500 hover:bg-green-600 w-full">
                  Criar Feedback no timestamp atual
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Alterações requisitadas</h3>
                  <div className="bg-gray-100 rounded-lg h-[250px] overflow-hidden flex flex-col">
                    <div className="grid grid-cols-2 text-sm font-medium text-gray-500 px-3 py-2 border-b border-gray-200">
                      <span>Nome</span>
                      <span className="text-right">Status</span>
                    </div>
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