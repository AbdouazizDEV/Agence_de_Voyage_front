import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * Utilitaires de formatage
 */

export const formatDate = (date: Date | string, pattern = 'dd/MM/yyyy'): string => {
  return format(new Date(date), pattern, { locale: fr })
}

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
}

export const formatRelativeTime = (date: Date | string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })
}

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  const locale = currency === 'EUR' ? 'fr-FR' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

