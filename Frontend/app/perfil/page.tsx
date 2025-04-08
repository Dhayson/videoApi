"use client"

import { useState } from "react"
import { Plus, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"
import { MainLayout } from "@/components/main-layout"

// Essa página não é prioridade

const mockContacts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Contato ${i + 1}`,
  status: i % 2 === 0 ? "ativo" : "inativo",
}))

const mockNotifications = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Notificação ${i + 1}`,
  status: i % 2 === 0 ? "pendente" : "visualizado",
}))

export default function PerfilPage() {
  const [contacts, setContacts] = useState(mockContacts)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [contactSearch, setContactSearch] = useState("")
  const [notificationSearch, setNotificationSearch] = useState("")

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase())
  )
  const filteredNotifications = notifications.filter((n) =>
    n.title.toLowerCase().includes(notificationSearch.toLowerCase())
  )

  const removeContact = (id: number) =>
    setContacts(contacts.filter((c) => c.id !== id))
  const removeNotification = (id: number) =>
    setNotifications(notifications.filter((n) => n.id !== id))

  return (
    <MainLayout>
      <Card className="max-w-8xl mx-auto m-6 min-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="text-xl">Bem vindo, Nome</CardTitle>
            <p className="text-sm text-gray-500">Hoje, 07 julho 2023</p>
          </div>
          <Logo className="h-8 w-8" />
        </CardHeader>

        <CardContent className="pt-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Perfil */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">U</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Nome</h3>
                  <p className="text-sm text-gray-500">exemplo@exemplo.com</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Nome</h4>
                  <p>Nome completo</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>Email de contato</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">CPF</h4>
                  <p>123.456.789-00</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Minhas Plataformas</h4>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    <span>@instagram</span>
                    <span>Nome no canal</span>
                    <span>@tiktok</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 text-blue-500 border-blue-500">
                    Editar plataformas
                  </Button>
                </div>
              </div>
            </div>

            {/* Bloco de Contatos e Notificações */}
            <div
              className="bg-blue-500 text-white rounded-lg p-4 w-full overflow-x-auto"
              style={{ height: "580px", maxWidth: "100%" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-hidden">

                {/* Contatos */}
                <div className="bg-blue-400 rounded-md p-3 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Contatos</h4>
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <Input
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    placeholder="Pesquisar contato..."
                    className="text-black mb-2"
                  />
                  <div className="grid grid-cols-[2fr_1fr_60px] text-xs font-semibold mb-2">
                    <span>Nome</span>
                    <span className="text-center">Status</span>
                    <span className="text-right pr-3">Excluir</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-sm">
                    {filteredContacts.map((c) => (
                      <div key={c.id} className="grid grid-cols-[2fr_1fr_60px] items-center whitespace-nowrap">
                        <span>{c.name}</span>
                        <span className="flex justify-center">
                          <span
                            className={`h-3 w-3 rounded-full ${
                              c.status === "ativo" ? "bg-blue-700" : "bg-gray-700"
                            }`}
                          />
                        </span>
                        <div className="flex justify-end pr-1">
                          <button onClick={() => removeContact(c.id)} className="hover:text-red-300">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Contato
                  </Button>
                </div>

                {/* Notificações */}
                <div className="bg-blue-400 rounded-md p-3 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Notificações</h4>
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <Input
                    value={notificationSearch}
                    onChange={(e) => setNotificationSearch(e.target.value)}
                    placeholder="Pesquisar notificação..."
                    className="text-black mb-2"
                  />
                  <div className="grid grid-cols-[2.2fr_1.2fr_60px] text-xs font-semibold mb-2 pr-1">
                    <span className="pl-1">Título</span>
                    <span className="text-center">Status</span>
                    <span className="text-right pr-3">Excluir</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-sm">
                    {filteredNotifications.map((n) => (
                      <div key={n.id} className="grid grid-cols-[2.2fr_1.2fr_60px] items-center whitespace-nowrap">
                        <span className="pl-1">{n.title}</span>
                        <span className="flex justify-center">
                          <span
                            className={`h-3 w-3 rounded-full ${
                              n.status === "visualizado" ? "bg-blue-700" : "bg-gray-700"
                            }`}
                          />
                        </span>
                        <div className="flex justify-end pr-1">
                          <button onClick={() => removeNotification(n.id)} className="hover:text-red-300">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
