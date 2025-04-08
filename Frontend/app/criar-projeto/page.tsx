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

export default function CriarProjetoPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/projeto/1")
  }

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
                <Label htmlFor="titulo">Título do projeto</Label>
                <Input id="titulo" placeholder="Escreva o título do projeto" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email para contato</Label>
                <Input id="email" type="email" placeholder="Escreva o email para contato" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Número para contato</Label>
                <div className="flex space-x-2">
                  <Input id="telefone" placeholder="Número de telefone ou celular" />
                  <Button variant="outline" size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Público</Label>
                  <RadioGroup defaultValue="publico" className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="publico" id="publico" />
                      <Label htmlFor="publico">Público</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="privado" id="privado" />
                      <Label htmlFor="privado">Privado</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de projeto</Label>
                  <RadioGroup defaultValue="com-fins" className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="com-fins" id="com-fins" />
                      <Label htmlFor="com-fins">Com fins lucrativos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sem-fins" id="sem-fins" />
                      <Label htmlFor="sem-fins">Sem fins lucrativos</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visualizacoes">Meta estimada de visualizações</Label>
                <div className="flex items-center space-x-2">
                  <Input id="visualizacoes" placeholder="Meta de visualizações" />
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data de lançamento</Label>
                <div className="relative">
                  <Input id="data" type="date" placeholder="Escolha a data" />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
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
                <div className="space-y-2">
                  <Label>Colaboradores</Label>
                  <div className="bg-gray-100 rounded-lg p-3 space-y-2 scroll-slim pr-1">
                    {[1, 2, 3, 4].map((id) => (
                      <div key={id} className="flex items-center space-x-2">
                        <span>•</span>
                        <span className="text-sm">Colaborador {id}</span>
                        <Avatar className="h-5 w-5 ml-auto">
                          <AvatarFallback className="text-xs">U</AvatarFallback>
                        </Avatar>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar colaboradores
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Selecione as plataformas</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Select onValueChange={setSelectedPlatform}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((id) => (
                            <SelectItem key={id} value={`plataforma-${id}`}>
                              Plataforma {id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                
                    </div>

                    <div>
                      <Textarea placeholder="Descrição do projeto" className="h-20" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <Button variant="outline" className="mt-2 text-blue-500 border-blue-500">
                      Enviar arquivo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 ml-2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                    </Button>
                  </div>

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

