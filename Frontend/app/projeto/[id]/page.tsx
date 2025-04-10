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
import { criarTask, deletarTask, listarTasksPorProjeto, atualizarStatusTask} from "../../../endpoints/tasks"
import { projectInfo } from "../../../endpoints/projetos.js"
import { listarAlteracoesPorProjeto, criarAlteracao, deletarAlteracao, atualizarAlteracao} from "../../../endpoints/alteracao"

const mockTasks = [
  // { id: 1, titulo: "Nome da task 1", date: "10/07/2023", status: "active" },
  // { id: 2, titulo: "Nome da task 2", date: "11/07/2023", status: "active" },
]

const mockAlteracoes = [
  // { id: 1, descricao: "Alteração 1", timestamp: 2 },
  // { id: 2, descricao: "Alteração 777", timestamp: 3 },
]

export default function ProjetoPage() {
  const [projectId, setProjectId] = useState("")
  const [projectNome, setProjectNome] = useState("")
  const [projectVideoUrl, setProjectVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  const [searchTerm, setSearchTerm] = useState("")
  const [tasks, setTasks] = useState(mockTasks)
  const [alteracoes, setAlteracoes] = useState(mockAlteracoes)
  const [selectedAlteracao, setSelectedAlteracao] = useState<string | null>(null)
  const [currentAlteracaoDesc, setCurrentAlteracaoDesc] = useState("")
  const [currentAlteracaoTimestamp, setCurrentAlteracaoTimestamp] = useState("")
  const [enableEditarAlteracao, setEnableEditarAlteracao] = useState(false)
  const [newAlteracaoText, setNewFeedbackText] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  function setCurrentAlteracaoDescCond(e) {
    if (enableEditarAlteracao) {
      setCurrentAlteracaoDesc(e)
    }
  }

  function setAlteracao(e) {
    const [id, descricao, timestamp] = e.split("|");
    console.log(timestamp)
    setSelectedAlteracao(id);
    setCurrentAlteracaoDesc(descricao);
    setCurrentAlteracaoTimestamp(timestamp)
  }

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    console.log(dataEntrega)
    criarTask(
      titulo,
      descricao,
      prioridade,
      dataEntrega.toString(),
      projectId
    ).then(
      Resposta => {
        console.log(Resposta)
        if (Resposta.sucesso) {
          setMostrarForm(false)
          updateTasks();
        }
        else {
          window.alert("Falhou em criar task. Tente novamente.")
        }
      }
    )
  };

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');
  const [prioridade, setPrioridade] = useState('MEDIUM');
  const [dataEntrega, setDataEntrega] = useState('');

  const filteredTasks = tasks.filter((task) => task.titulo.toLowerCase().includes(searchTerm.toLowerCase()))

  function updateAlteracoes() {
    listarAlteracoesPorProjeto(projectId).then(
            res => {
              console.log("Alterações:", res)
              if (res.sucesso) {
                setAlteracoes(res.data)
              }
              else {
                window.alert("Erro ao recuperar alterações")
              }
            }
          )
  }

  function updateTasks() {
    listarTasksPorProjeto(projectId).then(
      res => {
        setTasks(res.data)
        console.log(res)
      }
    )
  }
  
  function handleChangeStatus(id: string, newStatus: string) {
    atualizarStatusTask(id, newStatus).then((res: { sucesso: boolean }) => {
      if (res.sucesso) updateTasks();
      else window.alert("Erro ao atualizar status");
    });
  }

  useEffect(() => {
    if (projectId !== "") {
      updateAlteracoes()
      updateTasks()
    }
  }, [projectId]);

  useEffect(() => {
    // Essa função roda uma vez, quando o componente monta (inicializa)
    const path = window.location.pathname;
    const partes = path.split('/');
    const id = partes[2];
    setProjectId(id);
    console.log(id);

    projectInfo(id).then(
      res => {
        console.log("Info do projeto:", res)
        setProjectVideoUrl(res.data.urlVideo)
        setProjectNome(res.data.titulo)
        console.log(res.data.urlVideo)
      }
    )
  }, []); // <- Array com id

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
    deletarTask(id)
  }

  function handleRemoveAlteracao() {
    console.log("Deletando alteração", selectedAlteracao)
    setAlteracoes(alteracoes.filter((alteracoes) => alteracoes.id !== selectedAlteracao))
    deletarAlteracao(selectedAlteracao)
  }

  const [mostrarForm, setMostrarForm] = useState(false);

  const handleCreateTask = () => {
    setMostrarForm(true);
  }

  const handleCreateAlteracao = () => {
    if (!videoRef.current) return
    const descricao = newAlteracaoText;
    const timestamp = Math.floor(videoRef.current.currentTime)
    criarAlteracao(projectId, timestamp, descricao).then(
      res => {
        if (res.sucesso) {
          setNewFeedbackText("")
          updateAlteracoes()
        }
        else {
          window.alert("Erro ao criar feedback")
        }
      }
    )
  }

  const handlePatchAlteracao = () => {
    if (!videoRef.current) return
    const id = selectedAlteracao;
    const descricao = currentAlteracaoDesc;
    const timestamp = currentAlteracaoTimestamp;
    console.log(timestamp)
    atualizarAlteracao(projectId, id, timestamp, descricao).then(
      res => {
        if (res.sucesso) {
          setNewFeedbackText("")
          updateAlteracoes()
        }
        else {
          window.alert("Erro ao criar feedback")
        }
      }
    )
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {mostrarForm && (
          <div className="modal" >
            <form onSubmit={handleSubmitTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <div className="text-center">Data de entrega</div>
              <div className="text-center">Status</div>
            </div>

            <div className="scroll-slim max-h-[610px] overflow-y-auto space-y-2 pr-1">
              {filteredTasks.map((task) => (
                <div key={task.id} className="grid grid-cols-4 items-center py-2 border-b border-gray-100">
                  <div className="col-span-2 text-sm">{task.titulo}</div>
                  <div className="text-center text-sm">{task.dataEntrega}</div>
                  <div className="flex justify-center items-center space-x-2">
                    <select
                      value={task.status}
                      onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                      className="text-sm px-2 py-1 border rounded"
                    >
                      <option value="PENDENTE">Pendente</option>
                      <option value="EM_ANDAMENTO">Em andamento</option>
                      <option value="CONCLUIDA">Concluída</option>
                      
                    </select>
                    <button onClick={() => handleRemoveTask(task.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
          </CardContent>
          {!mostrarForm && (
            <Button onClick={handleCreateTask} className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
              Criar nova task
              <Plus className="h-4 w-4 ml-1" />
            </Button>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Logo className="h-8 w-8" />
                <CardTitle className="text-xl text-blue-600">{projectNome}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
                <VideoWithFeedback ref={videoRef} src={projectVideoUrl} feedbacks={alteracoes} />
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-medium text-gray-700">Escreva uma alteração</h3>
                <Textarea
                  placeholder="Digite sua sugestão de alteração..."
                  className="h-20"
                  value={newAlteracaoText}
                  onChange={(e) => setNewFeedbackText(e.target.value)}
                />
                <Button onClick={handleCreateAlteracao} className="bg-green-500 hover:bg-green-600 w-full">
                  Criar sugestão no timestamp atual
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Alterações</h3>
                  <div className="bg-gray-100 rounded-lg h-[250px] overflow-hidden flex flex-col">
                    <div className="grid grid-cols-2 text-sm font-medium text-gray-500 px-3 py-2 border-b border-gray-200">
                      <span>Nome</span>
                      <span className="text-right">Timestamp</span>
                    </div>
                    <div className="flex-1 overflow-y-auto scroll-slim px-3 py-2 space-y-2">
                      {alteracoes.map((alteracao) => (
                        <div key={alteracao.id} className="flex justify-between items-center text-sm">
                          <span className="flex items-center space-x-2">
                            <span>•</span>
                            <span>{alteracao.descricao}</span>
                          </span>
                          <div/>
                            <span>{alteracao.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between h-[280px]">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Selecione a alteração</h3>
                    <Select onValueChange={(e) => setAlteracao(e)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {alteracoes.map((alteracao) => (
                          <SelectItem key={alteracao.id} value={`${alteracao.id}|${alteracao.descricao}|${alteracao.timestamp}`} >
                            {alteracao.descricao}
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
                    <h3 className="font-medium text-gray-700">Descrição da alteração</h3>
                    <Textarea placeholder="Edite a alteração..." className="h-20"
                      value={currentAlteracaoDesc} onChange={(e) => setCurrentAlteracaoDescCond(e.target.value)} />
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="text-blue-500 border-blue-500">
                      Enviar Arquivo
                    </Button>
                    <Button variant="outline" className="text-gray-500 border-gray-500" onClick={handleRemoveAlteracao}>
                      Excluir Alteração
                      <Trash2 size={20} />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    {selectedAlteracao && (
                    <Button variant="outline" className="text-blue-500 border-blue-500" onClick={(e) => setEnableEditarAlteracao(!enableEditarAlteracao)}>
                      {enableEditarAlteracao ? "Desabilitar edição" : "Habilitar edição"}
                      </Button>
                    )}
                    {enableEditarAlteracao && (
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => handlePatchAlteracao()}>
                      Enviar
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    )}
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