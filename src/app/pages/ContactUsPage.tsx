import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { Button } from '@common/components/ui/Button'
import { Card, CardContent } from '@common/components/ui/Card'
import { Input } from '@common/components/ui/Input'
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@common/utils/cn'

/**
 * Page Contact Us
 */
export const ContactUsPage = () => {
  const { t } = useTranslation()

  const contactSchema = z.object({
    name: z.string().min(2, t('pages:contact.validationName')),
    email: z.string().email(t('pages:contact.validationEmail')),
    phone: z.string().optional(),
    subject: z.string().min(3, t('pages:contact.validationSubject')),
    message: z.string().min(10, t('pages:contact.validationMessage')),
  })

  type ContactFormData = z.infer<typeof contactSchema>

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
    toast.success(t('pages:contact.successMessage'))
    reset()
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t('pages:contact.address'),
      content: t('pages:contact.addressValue'),
    },
    {
      icon: Phone,
      title: t('pages:contact.phone'),
      content: t('pages:contact.phoneValue'),
    },
    {
      icon: Mail,
      title: t('pages:contact.email'),
      content: t('pages:contact.emailValue'),
    },
    {
      icon: MessageCircle,
      title: t('pages:contact.whatsapp'),
      content: t('pages:contact.chatWithUs'),
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('pages:contact.heroTitle')}
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {t('pages:contact.heroSubtitle')}
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
                      {t('pages:contact.contactInfo')}
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
                      {t('pages:contact.businessHours')}
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>{t('pages:contact.mondayFriday')}</span>
                        <span className="font-medium">{t('pages:contact.hours1')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('pages:contact.saturday')}</span>
                        <span className="font-medium">{t('pages:contact.hours2')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('pages:contact.sunday')}</span>
                        <span className="font-medium">{t('pages:contact.closed')}</span>
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
                      {t('pages:contact.sendMessage')}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                          label={t('pages:contact.fullName')}
                          placeholder={t('pages:contact.namePlaceholder')}
                          {...register('name')}
                          error={errors.name?.message}
                        />
                        <Input
                          label={t('pages:contact.email')}
                          type="email"
                          placeholder={t('pages:contact.emailPlaceholder')}
                          {...register('email')}
                          error={errors.email?.message}
                        />
                      </div>

                      <Input
                        label={t('pages:contact.phoneLabel')}
                        type="tel"
                        placeholder={t('pages:contact.phonePlaceholder')}
                        {...register('phone')}
                        error={errors.phone?.message}
                      />

                      <Input
                        label={t('pages:contact.subject')}
                        placeholder={t('pages:contact.subjectPlaceholder')}
                        {...register('subject')}
                        error={errors.subject?.message}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('pages:contact.message')}
                        </label>
                        <textarea
                          rows={6}
                          placeholder={t('pages:contact.messagePlaceholder')}
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
                        {t('pages:contact.sendButton')}
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

