import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { Button } from '@common/components/ui/Button'
import { Card, CardContent } from '@common/components/ui/Card'
import { Input } from '@common/components/ui/Input'
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@common/utils/cn'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ContactFormData = z.infer<typeof contactSchema>

/**
 * Page Contact Us
 */
export const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    // TODO: Implémenter l'envoi du formulaire
    console.log('Contact form data:', data)
    toast.success('Message envoyé avec succès ! Nous vous répondrons bientôt.')
    reset()
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: '123 Travel Lane, Adventure City',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+1 (034) 567-890',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@travelagency.com',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: 'Chat with Us',
      isLink: true,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-Nous</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions et vous aider à
              planifier votre prochain voyage
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Informations de Contact
                    </h2>
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => {
                        const Icon = info.icon
                        return (
                          <div key={index} className="flex items-start gap-4">
                            <div className="bg-primary-100 p-3 rounded-lg">
                              <Icon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {info.title}
                              </h3>
                              {info.isLink ? (
                                <a
                                  href="https://wa.me/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:text-primary-700 hover:underline"
                                >
                                  {info.content}
                                </a>
                              ) : (
                                <p className="text-gray-600">{info.content}</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Heures d'Ouverture
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Lundi - Vendredi</span>
                        <span className="font-medium">9h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi</span>
                        <span className="font-medium">10h00 - 16h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimanche</span>
                        <span className="font-medium">Fermé</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Envoyez-nous un Message
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                          label="Nom complet"
                          placeholder="Votre nom"
                          {...register('name')}
                          error={errors.name?.message}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="votre@email.com"
                          {...register('email')}
                          error={errors.email?.message}
                        />
                      </div>

                      <Input
                        label="Téléphone (optionnel)"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        {...register('phone')}
                        error={errors.phone?.message}
                      />

                      <Input
                        label="Sujet"
                        placeholder="Sujet de votre message"
                        {...register('subject')}
                        error={errors.subject?.message}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          rows={6}
                          placeholder="Votre message..."
                          {...register('message')}
                          className={cn(
                            'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                            errors.message && 'border-red-500 focus-visible:ring-red-500'
                          )}
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

