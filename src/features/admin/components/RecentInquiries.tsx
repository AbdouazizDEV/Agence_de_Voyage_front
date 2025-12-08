import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'

interface Inquiry {
  id: string
  name: string
  avatar?: string
  offer: string
  timeAgo: string
}

interface RecentInquiriesProps {
  inquiries: Inquiry[]
}

/**
 * Composant pour afficher les inquiries récentes
 */
export const RecentInquiries = ({ inquiries }: RecentInquiriesProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                {inquiry.avatar ? (
                  <img
                    src={inquiry.avatar}
                    alt={inquiry.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-blue-600">
                    {getInitials(inquiry.name)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {inquiry.name}
                </p>
                <p className="text-xs text-gray-500 truncate">Offer: {inquiry.offer}</p>
              </div>

              {/* Time */}
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {inquiry.timeAgo}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

