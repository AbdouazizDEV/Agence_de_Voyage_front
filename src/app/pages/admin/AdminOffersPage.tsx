import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { AdminLayout } from '@common/components/layout/AdminLayout'
import { AdminOfferCard } from '@features/admin/components/AdminOfferCard'
import { OfferForm } from '@features/admin/components/OfferForm'
import { Pagination } from '@common/components/ui/Pagination'
import { Select } from '@common/components/ui/Select'
import { Input } from '@common/components/ui/Input'
import { Button } from '@common/components/ui/Button'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import {
  useAdminOffers,
  useCreateOffer,
  useUpdateOffer,
  useToggleOfferStatus,
  useDuplicateOffer,
  useDeleteOffer,
} from '@features/admin/hooks/useAdminOffers'
import { useAdminCategories } from '@features/admin/hooks/useAdminCategories'
import { AdminOffer, CreateOfferDto, UpdateOfferDto } from '@features/admin/api/adminOffersApi'
import { SearchParams } from '@features/offers/types/offers.types'

/**
 * Page de gestion des offres pour l'admin
 */
export const AdminOffersPage = () => {
  const [selectedOffer, setSelectedOffer] = useState<AdminOffer | null>(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreating, setIsCreating] = useState(false)

  const limit = 5 // 5 offres par page

  // Récupérer les catégories
  const { data: categories } = useAdminCategories()

  // Construire les paramètres de recherche
  const searchParams: SearchParams & { isActive?: boolean } = {
    page: currentPage,
    limit,
    search: search || undefined,
    category: categoryFilter || undefined,
    isActive: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
  }

  const { data, isLoading, error, refetch } = useAdminOffers(searchParams)
  const createOffer = useCreateOffer()
  const updateOffer = useUpdateOffer()
  const toggleStatus = useToggleOfferStatus()
  const duplicateOffer = useDuplicateOffer()
  const deleteOffer = useDeleteOffer()

  const handleSelectOffer = (offer: AdminOffer) => {
    setSelectedOffer(offer)
    setIsCreating(false)
  }

  const handleCreateNew = () => {
    setSelectedOffer(null)
    setIsCreating(true)
    // Scroll vers le formulaire
    setTimeout(() => {
      const formElement = document.querySelector('[data-offer-form]')
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleCancel = () => {
    setSelectedOffer(null)
    setIsCreating(false)
  }

  const handleSubmit = async (formData: CreateOfferDto | UpdateOfferDto) => {
    try {
      if (selectedOffer) {
        // Mise à jour
        const updated = await updateOffer.mutateAsync({
          offerId: selectedOffer.id,
          data: formData as UpdateOfferDto,
        })
        // Mettre à jour l'offre sélectionnée avec les nouvelles données
        setSelectedOffer(updated)
      } else {
        // Création
        await createOffer.mutateAsync(formData as CreateOfferDto)
        setIsCreating(false)
        // Rafraîchir la liste
        refetch()
      }
    } catch (error) {
      // L'erreur est déjà gérée par le hook
      console.error('Error submitting form:', error)
    }
  }

  const handleToggleStatus = async (offerId: string) => {
    await toggleStatus.mutateAsync(offerId)
    // Mettre à jour l'offre sélectionnée si c'est celle-ci
    if (selectedOffer?.id === offerId) {
      const updated = await refetch()
      const updatedOffer = updated.data?.data.find((o) => o.id === offerId)
      if (updatedOffer) {
        setSelectedOffer(updatedOffer)
      }
    }
  }

  const handleDuplicate = async (offerId: string) => {
    await duplicateOffer.mutateAsync(offerId)
  }

  const handleDelete = async (offerId: string) => {
    await deleteOffer.mutateAsync(offerId)
    if (selectedOffer?.id === offerId) {
      setSelectedOffer(null)
    }
  }

  // Construire les options de catégories depuis l'API
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...(categories || [])
      .filter((cat) => cat.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map((cat) => ({
        value: cat.name,
        label: `${cat.icon} ${cat.name}`,
      })),
  ]

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Désactivé' },
  ]

  // Plus besoin de filtrer côté client, le filtrage se fait côté serveur
  const filteredOffers = data?.data || []

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Offer Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Offer Management</h1>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by title, destination..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                options={categoryOptions}
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-48"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-40"
              />
            </div>
          </div>

          {/* Offers List */}
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <Loading message="Chargement des offres..." />
            </div>
          )}

          {error && (
            <Error
              message="Erreur lors du chargement des offres"
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !error && (
            <>
              <div className="space-y-3">
                {filteredOffers.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    Aucune offre trouvée
                  </div>
                ) : (
                  filteredOffers.map((offer) => (
                    <AdminOfferCard
                      key={offer.id}
                      offer={offer}
                      isSelected={selectedOffer?.id === offer.id}
                      onSelect={handleSelectOffer}
                      onEdit={handleSelectOffer}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column - Edit/Create Form */}
        <div className="lg:col-span-1" data-offer-form>
          {(selectedOffer || isCreating) ? (
            <OfferForm
              offer={selectedOffer || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={createOffer.isPending || updateOffer.isPending}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Select an offer to edit</p>
              <Button variant="primary" onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Offer
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

