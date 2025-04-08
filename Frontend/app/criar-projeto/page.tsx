"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Check, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"
import { MainLayout } from "@/components/main-layout"
import { criarProjeto} from "../../endpoints/projetos.js"

// Essa página é importante.
// Está pendente a formulação dos colaboradores, plataformas, contatos e outras métricas para o projeto

export default function CriarProjetoPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const Resposta = await criarProjeto(nome, url, desc)
    console.log(Resposta)
    router.push("/projeto/" + Resposta.id)
  }

  const [nome, setNome] = useState("")
  const [desc, setDesc] = useState("")
  const [url, setUrl] = useState("")

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Informações do projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Nome do projeto</Label>
                <Input id="titulo" placeholder="Escreva o nome do projeto" value={nome} onChange={(e) => setNome(e.target.value)}/>
              </div>

              <div>
                <Textarea placeholder="Descrição do projeto" className="h-20" value={desc} onChange={(e) => setDesc(e.target.value)}/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Url do vídeo</Label>
                <Input id="url" placeholder="Cole aqui a url do vídeo" value={url} onChange={(e) => setUrl(e.target.value)}/>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Logo className="h-8 w-8" />
                <CardTitle className="text-xl text-green-600">Crie seu projeto</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </div>

              <div className="space-y-4">

                <div className="flex justify-between items-center">

                  <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600">
                    Publicar
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

