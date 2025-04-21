// Alternativa 1: Importaciones directas
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


import { ChevronLeft, Send, Plus, MoreVertical, Check, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Vista Previa de la Interfaz de Chat</h1>

      {/* Vista de Escritorio */}
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Vista de Escritorio</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Barra de navegación */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Chat App</div>
            <div className="flex items-center space-x-4">
              <span>Usuario Ejemplo</span>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex h-[600px]">
            {/* Panel izquierdo - Lista de conversaciones */}
            <div className="w-1/3 border-r">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mensajes</h2>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4 mr-1" />
                  Nuevo Chat
                </Button>
              </div>

              <div className="overflow-y-auto h-[calc(600px-64px)]">
                {/* Conversación activa */}
                <div className="flex items-center p-3 border-b bg-gray-100 cursor-pointer hover:bg-gray-50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium truncate">Juan Pérez</h3>
                      <span className="text-xs text-gray-500">10:42</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">Claro, nos vemos mañana en la reunión</p>
                  </div>
                </div>

                {/* Conversación con mensajes no leídos */}
                <div className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-50">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -top-1 -right-1 bg-green-500 h-5 w-5 flex items-center justify-center p-0">
                      2
                    </Badge>
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium truncate">María García</h3>
                      <span className="text-xs text-gray-500">09:15</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">¿Has revisado el documento que te envié?</p>
                  </div>
                </div>

                {/* Más conversaciones */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-50">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium truncate">Usuario {i}</h3>
                        <span className="text-xs text-gray-500">Ayer</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">Último mensaje de la conversación...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel derecho - Área de chat */}
            <div className="flex-1 flex flex-col">
              {/* Cabecera de conversación */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold">Juan Pérez</h2>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              {/* Área de mensajes */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {/* Separador de fecha */}
                <div className="flex justify-center my-4">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">Hoy</span>
                </div>

                {/* Mensaje recibido */}
                <div className="flex mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="max-w-[70%]">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Hola, ¿cómo estás? ¿Podemos reunirnos mañana para discutir el proyecto?</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">10:30</div>
                  </div>
                </div>

                {/* Mensaje enviado */}
                <div className="flex justify-end mb-4">
                  <div className="max-w-[70%]">
                    <div className="bg-green-500 text-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">¡Hola! Claro, podemos reunirnos mañana. ¿Te parece bien a las 10:00 AM?</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 mr-2 flex justify-end items-center">
                      10:32
                      <Check className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Mensaje recibido */}
                <div className="flex mb-4">
                  <div className="w-8 mr-2"></div> {/* Espacio para mantener alineación sin avatar */}
                  <div className="max-w-[70%]">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">
                        Perfecto, a las 10:00 AM está bien. Nos vemos en la sala de conferencias.
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">10:35</div>
                  </div>
                </div>

                {/* Mensaje enviado */}
                <div className="flex justify-end mb-4">
                  <div className="max-w-[70%]">
                    <div className="bg-green-500 text-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Claro, nos vemos mañana en la reunión</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 mr-2 flex justify-end items-center">
                      10:42
                      <Check className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Indicador de escritura */}
                <div className="flex mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Área de entrada de mensaje */}
              <div className="p-3 border-t bg-white">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Input placeholder="Escribe un mensaje..." className="flex-1 mx-2 rounded-full" />
                  <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vista Móvil */}
      <div className="w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Vista Móvil</h2>
        <div className="flex space-x-4">
          {/* Vista de lista de conversaciones */}
          <Card className="w-full max-w-[320px] h-[600px] overflow-hidden">
            <CardHeader className="p-4 bg-green-600 text-white">
              <h3 className="text-lg font-semibold">Mensajes</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-3 border-b flex justify-between items-center">
                <h2 className="text-base font-semibold">Chats</h2>
                <Button size="sm" className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="overflow-y-auto h-[calc(600px-120px)]">
                {/* Conversación activa */}
                <div className="flex items-center p-3 border-b bg-gray-100 cursor-pointer hover:bg-gray-50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium truncate">Juan Pérez</h3>
                      <span className="text-xs text-gray-500">10:42</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">Claro, nos vemos mañana en la reunión</p>
                  </div>
                </div>

                {/* Conversación con mensajes no leídos */}
                <div className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-50">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -top-1 -right-1 bg-green-500 h-5 w-5 flex items-center justify-center p-0">
                      2
                    </Badge>
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium truncate">María García</h3>
                      <span className="text-xs text-gray-500">09:15</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">¿Has revisado el documento que te envié?</p>
                  </div>
                </div>

                {/* Más conversaciones */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-50">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium truncate">Usuario {i}</h3>
                        <span className="text-xs text-gray-500">Ayer</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">Último mensaje de la conversación...</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vista de conversación */}
          <Card className="w-full max-w-[320px] h-[600px] overflow-hidden flex flex-col">
            <CardHeader className="p-3 border-b flex flex-row items-center space-y-0 space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <h2 className="text-base font-semibold">Juan Pérez</h2>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              {/* Área de mensajes */}
              <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                {/* Separador de fecha */}
                <div className="flex justify-center my-3">
                  <span className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-600">Hoy</span>
                </div>

                {/* Mensaje recibido */}
                <div className="flex mb-3">
                  <Avatar className="h-6 w-6 mr-1">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="max-w-[75%]">
                    <div className="bg-white rounded-lg p-2 shadow-sm text-xs">
                      <p>Hola, ¿cómo estás? ¿Podemos reunirnos mañana?</p>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 ml-1">10:30</div>
                  </div>
                </div>

                {/* Mensaje enviado */}
                <div className="flex justify-end mb-3">
                  <div className="max-w-[75%]">
                    <div className="bg-green-500 text-white rounded-lg p-2 shadow-sm text-xs">
                      <p>¡Hola! Claro, podemos reunirnos mañana a las 10:00 AM.</p>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 mr-1 flex justify-end items-center">
                      10:32
                      <Check className="h-2 w-2 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Mensaje recibido */}
                <div className="flex mb-3">
                  <div className="w-6 mr-1"></div> {/* Espacio para mantener alineación sin avatar */}
                  <div className="max-w-[75%]">
                    <div className="bg-white rounded-lg p-2 shadow-sm text-xs">
                      <p>Perfecto, a las 10:00 AM. Nos vemos en la sala de conferencias.</p>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 ml-1">10:35</div>
                  </div>
                </div>

                {/* Mensaje enviado */}
                <div className="flex justify-end mb-3">
                  <div className="max-w-[75%]">
                    <div className="bg-green-500 text-white rounded-lg p-2 shadow-sm text-xs">
                      <p>Claro, nos vemos mañana en la reunión</p>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 mr-1 flex justify-end items-center">
                      10:42
                      <Check className="h-2 w-2 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Área de entrada de mensaje */}
              <div className="p-2 border-t bg-white">
                <div className="flex items-center">
                  <Input placeholder="Escribe un mensaje..." className="flex-1 h-9 text-sm rounded-full" />
                  <Button size="icon" className="h-8 w-8 ml-1 rounded-full bg-green-500 hover:bg-green-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}