import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { Card, CardContent } from '@common/components/ui/Card'
import { Button } from '@common/components/ui/Button'
import {
  Plane,
  Users,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight,
  Quote,
  Globe,
  Shield,
  Sparkles,
} from 'lucide-react'
import { cn } from '@common/utils/cn'

/**
 * Hook pour détecter si un élément est visible dans le viewport
 */
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement | null>,
  options = {}
) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, ...options }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isVisible
}

/**
 * Témoignages clients - Les textes seront traduits dynamiquement
 */
const getTestimonials = (t: (key: string) => string) => [
  {
    id: 1,
    name: 'Sophie Martin',
    role: t('pages:about.testimonial1Role'),
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    text: t('pages:about.testimonial1Text'),
    rating: 5,
  },
  {
    id: 2,
    name: 'Jean Dupont',
    role: t('pages:about.testimonial2Role'),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    text: t('pages:about.testimonial2Text'),
    rating: 5,
  },
  {
    id: 3,
    name: 'Marie Dubois',
    role: t('pages:about.testimonial3Role'),
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    text: t('pages:about.testimonial3Text'),
    rating: 5,
  },
  {
    id: 4,
    name: 'Pierre Leroy',
    role: t('pages:about.testimonial4Role'),
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    text: t('pages:about.testimonial4Text'),
    rating: 5,
  },
]

/**
 * Statistiques - Les labels seront traduits dynamiquement
 */
const getStats = (t: (key: string) => string) => [
  { number: '50K+', label: t('pages:about.statsClients'), icon: Users },
  { number: '200+', label: t('pages:about.statsDestinations'), icon: Globe },
  { number: '15+', label: t('pages:about.statsExperience'), icon: Award },
  { number: '98%', label: t('pages:about.statsSatisfaction'), icon: Heart },
]

/**
 * Page À propos de nous - Version améliorée avec animations
 */
export const AboutUsPage = () => {
  const { t } = useTranslation()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRefs = {
    story: useRef<HTMLElement>(null),
    features: useRef<HTMLElement>(null),
    stats: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    mission: useRef<HTMLElement>(null),
  }

  const isStoryVisible = useIntersectionObserver(sectionRefs.story)
  const isFeaturesVisible = useIntersectionObserver(sectionRefs.features)
  const isStatsVisible = useIntersectionObserver(sectionRefs.stats)
  const isTestimonialsVisible = useIntersectionObserver(sectionRefs.testimonials)
  const isMissionVisible = useIntersectionObserver(sectionRefs.mission)

  const testimonials = getTestimonials(t)
  const stats = getStats(t)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const features = [
    {
      icon: Plane,
      title: t('pages:about.feature1Title'),
      description: t('pages:about.feature1Description'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: t('pages:about.feature2Title'),
      description: t('pages:about.feature2Description'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Award,
      title: t('pages:about.feature3Title'),
      description: t('pages:about.feature3Description'),
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Heart,
      title: t('pages:about.feature4Title'),
      description: t('pages:about.feature4Description'),
      color: 'from-pink-500 to-pink-600',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section avec animation */}
        <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in">
              <div className="inline-block mb-6">
                <Sparkles className="h-16 w-16 text-yellow-300 animate-bounce" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
                {t('pages:about.heroTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto animate-slide-up delay-200">
                {t('pages:about.heroSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section avec animation */}
        <section
          ref={sectionRefs.stats}
          className="py-16 bg-white -mt-8 relative z-20"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={index}
                    className={cn(
                      'text-center transition-all duration-500 hover:scale-105 hover:shadow-xl',
                      isStatsVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-primary-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Story Section avec animation */}
        <section
          ref={sectionRefs.story}
          className="py-20 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card
                className={cn(
                  'overflow-hidden transition-all duration-1000',
                  isStoryVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                )}
              >
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-20 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full" />
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {t('pages:about.storyTitle')}
                    </h2>
                  </div>
                  <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                    <p className="animate-fade-in">
                      {t('pages:about.storyParagraph1')}
                    </p>
                    <p className="animate-fade-in delay-300">
                      {t('pages:about.storyParagraph2')}
                    </p>
                    <p className="animate-fade-in delay-500">
                      {t('pages:about.storyParagraph3')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid avec animations */}
        <section
          ref={sectionRefs.features}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t('pages:about.whyChooseUs')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('pages:about.whyChooseUsSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className={cn(
                      'group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary-500',
                      isFeaturesVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6">
                      <div
                        className={cn(
                          'bg-gradient-to-br p-4 rounded-xl mb-4 w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6',
                          feature.color
                        )}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section
          ref={sectionRefs.testimonials}
          className="py-20 bg-gradient-to-br from-primary-50 to-primary-100"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t('pages:about.testimonialsTitle')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('pages:about.testimonialsSubtitle')}
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <Card
                className={cn(
                  'overflow-hidden transition-all duration-500',
                  isTestimonialsVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                )}
              >
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-primary-200"
                      />
                    </div>
                    <div className="flex-grow">
                      <Quote className="h-8 w-8 text-primary-400 mb-4" />
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-600">
                          {testimonials[currentTestimonial].role}
                        </div>
                        <div className="flex gap-1 mt-2">
                          {[...Array(testimonials[currentTestimonial].rating)].map(
                            (_, i) => (
                              <span key={i} className="text-yellow-400 text-xl">
                                ★
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTestimonial(index)
                        setIsAutoPlaying(false)
                      }}
                      className={cn(
                        'w-3 h-3 rounded-full transition-all duration-300',
                        index === currentTestimonial
                          ? 'bg-primary-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision avec animations */}
        <section
          ref={sectionRefs.mission}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card
                className={cn(
                  'overflow-hidden transition-all duration-1000 hover:shadow-2xl',
                  isMissionVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                )}
              >
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-full opacity-10" />
                  <div className="relative z-10">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {t('pages:about.missionTitle')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {t('pages:about.missionDescription')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  'overflow-hidden transition-all duration-1000 hover:shadow-2xl',
                  isMissionVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                )}
                style={{ transitionDelay: '200ms' }}
              >
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-br-full opacity-10" />
                  <div className="relative z-10">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <Globe className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {t('pages:about.visionTitle')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {t('pages:about.visionDescription')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
