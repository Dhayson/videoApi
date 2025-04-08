"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Logo } from "@/components/logo"

export default function CadastroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em um cenário real, aqui faria o cadastro
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-16 h-16" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Digite seu nome..." required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="Digite seu email..." required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha..."
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="Digite seu CPF..." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de nascimento</Label>
              <Input id="dataNascimento" type="date" placeholder="dd/mm/aaaa" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Você é</Label>
            <RadioGroup defaultValue="produtor" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="produtor" id="produtor" />
                <Label htmlFor="produtor">Produtor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="patrocinador" id="patrocinador" />
                <Label htmlFor="patrocinador">Patrocinador</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plataformas">Plataformas que trabalha</Label>
            <Input id="plataformas" placeholder="Digite suas plataformas de trabalho..." />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Criar conta
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Já possui conta?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Faça log in
          </Link>
        </div>
      </div>
    </div>
  )
}

