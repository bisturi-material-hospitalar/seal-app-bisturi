import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'
import type { StorefrontFunctionComponent } from 'vtex.render-runtime'

// CSS Handles
const CSS_HANDLES = [
  'menuContainer',
  'menuButton',
  'menuBackdrop',
  'menuOverlay',
  'menuHeader',
  'menuHeaderTitle',
  'menuCloseButton',
  'menuContent',
  'departmentList',
  'departmentItem',
  'departmentLink',
  'departmentIcon',
  'departmentName',
  'departmentArrow',
  'categoryView',
  'categoryHeader',
  'categoryBackButton',
  'categoryTitle',
  'categoryCloseButton',
  'categoryContent',
  'viewAllLink',
  'categoryList',
  'categoryItem',
  'categoryLink',
  'categoryName',
  'loadingContainer',
  'errorContainer',
] as const

// Interfaces
interface Category {
  id: string
  name: string
  href: string
  children?: Category[]
}

interface Props {
  buttonLabel?: string
  viewAllText?: string
  showDepartmentIcons?: boolean
  showArrows?: boolean
  isActive?: boolean
  iconMap?: Record<string, string>
}

interface VTEXCategory {
  id: number
  name: string
  url?: string
  children?: VTEXCategory[]
}

// Função auxiliar para transformar categorias da API
const transformCategories = (data: VTEXCategory[]): Category[] =>
  data.map((cat) => ({
    id: String(cat.id),
    name: cat.name,
    href: cat.url ?? `/${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
    children: cat.children?.map((child) => ({
      id: String(child.id),
      name: child.name,
      href: child.url ?? `/${child.name.toLowerCase().replace(/\s+/g, '-')}`,
      children: child.children?.map((grandchild) => ({
        id: String(grandchild.id),
        name: grandchild.name,
        href:
          grandchild.url ??
          `/${grandchild.name.toLowerCase().replace(/\s+/g, '-')}`,
      })),
    })),
  }))

const MenuCustom: StorefrontFunctionComponent<Props> = ({
  buttonLabel = 'Departamentos',
  viewAllText = 'Ver todos',
  showDepartmentIcons = true,
  showArrows = true,
  isActive = true,
  iconMap = {},
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { navigate } = useRuntime()
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Category | null>(
    null
  )

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/catalog_system/pub/category/tree/1')

        if (!response.ok) {
          throw new Error('Erro ao carregar categorias')
        }

        const data: VTEXCategory[] = await response.json()

        setCategories(transformCategories(data))
      } catch (err) {
        console.error('Erro ao carregar categorias:', err)
        setError('Erro ao carregar categorias')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (!isActive) return null

  const handleCloseMenu = () => {
    setMenuOpen(false)
    setSelectedDepartment(null)
  }

  const handleDepartmentClick = (dept: Category) => {
    if (dept.children?.length) {
      setSelectedDepartment(dept)
    } else {
      navigate({ page: 'store.customPage', to: dept.href })
      handleCloseMenu()
    }
  }

  const handleCategoryClick = (category: Category) => {
    navigate({ page: 'store.customPage', to: category.href })
    handleCloseMenu()
  }

  const handleBackClick = () => setSelectedDepartment(null)

  const handleViewAllClick = () => {
    if (!selectedDepartment) return
    navigate({ page: 'store.customPage', to: selectedDepartment.href })
    handleCloseMenu()
  }

  const getDepartmentIcon = (dept: Category) => {
    const key = dept.name.toLowerCase().replace(/\s+/g, '-')
    const svgUrl = iconMap[key] || iconMap[dept.id]

    if (svgUrl) return svgUrl

    const defaultIconMap: Record<string, string> = {
      acupuntura: '🔗',
      estetoscópio: '🩺',
      aparelho: '📱',
      equipamentos: '🏥',
      bolsas: '👜',
      conforto: '🏠',
      cpap: '😴',
      curativos: '🩹',
      estética: '💄',
      limpeza: '🧽',
      ortopedia: '🦴',
      medicamentos: '💊',
      cirurgia: '🔬',
      hospitalar: '🏥',
    }

    for (const [k, icon] of Object.entries(defaultIconMap)) {
      if (key.includes(k)) return icon
    }

    return '📦'
  }

  if (loading) {
    return (
      <div className={handles.loadingContainer}>
        <button
          className={handles.menuButton}
          disabled
          aria-label="Carregando menu"
        >
          ☰ {buttonLabel}
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className={handles.errorContainer}>
        <button
          className={handles.menuButton}
          disabled
          aria-label="Erro no menu"
        >
          ☰ {buttonLabel}
        </button>
      </div>
    )
  }

  return (
    <div className={handles.menuContainer}>
      <button
        className={handles.menuButton}
        aria-haspopup="true"
        aria-label={buttonLabel}
        onClick={() => setMenuOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setMenuOpen(true)
          }
        }}
        tabIndex={0}
        data-testid="menu-button"
      >
        ☰ {buttonLabel}
      </button>

      {menuOpen && (
        <div
          className={handles.menuBackdrop}
          role="button"
          aria-label="Fechar menu"
          tabIndex={0}
          onClick={handleCloseMenu}
          onKeyDown={(e) => {
            if (['Enter', ' ', 'Escape'].includes(e.key)) {
              e.preventDefault()
              handleCloseMenu()
            }
          }}
        />
      )}

      {menuOpen && (
        <nav
          className={handles.menuOverlay}
          role="navigation"
          aria-label="Menu de categorias"
        >
          {!selectedDepartment ? (
            <>
              <div className={handles.menuHeader}>
                <h2 className={handles.menuHeaderTitle}>{buttonLabel}</h2>
                <button
                  className={handles.menuCloseButton}
                  onClick={handleCloseMenu}
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>
              <div className={handles.menuContent}>
                <ul className={handles.departmentList}>
                  {categories.map((dept) => (
                    <li key={dept.id} className={handles.departmentItem}>
                      <button
                        className={handles.departmentLink}
                        onClick={() => handleDepartmentClick(dept)}
                        aria-label={`${dept.name}${
                          dept.children?.length ? ' - expandir submenu' : ''
                        }`}
                      >
                        {showDepartmentIcons && (
                          <span
                            className={handles.departmentIcon}
                            aria-hidden="true"
                          >
                            {getDepartmentIcon(dept).startsWith('http') ? (
                              <img
                                src={getDepartmentIcon(dept)}
                                alt={`${dept.name} ícone`}
                                width={20}
                                height={20}
                              />
                            ) : (
                              getDepartmentIcon(dept)
                            )}
                          </span>
                        )}
                        <span className={handles.departmentName}>
                          {dept.name}
                        </span>
                        {showArrows && dept.children?.length && (
                          <span
                            className={handles.departmentArrow}
                            aria-hidden="true"
                          >
                            &#8250;
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className={handles.categoryView}>
              <div className={handles.categoryHeader}>
                <button
                  className={handles.categoryBackButton}
                  onClick={handleBackClick}
                  aria-label="Voltar"
                >
                  ‹
                </button>
                <h2 className={handles.categoryTitle}>
                  {selectedDepartment.name}
                </h2>
                <button
                  className={handles.categoryCloseButton}
                  onClick={handleCloseMenu}
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>
              <div className={handles.categoryContent}>
                <button
                  className={handles.viewAllLink}
                  onClick={handleViewAllClick}
                  aria-label={`Ver todos de ${selectedDepartment.name}`}
                >
                  {viewAllText}
                </button>
                <ul className={handles.categoryList}>
                  {selectedDepartment.children?.map((category) => (
                    <li key={category.id} className={handles.categoryItem}>
                      <button
                        className={handles.categoryLink}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <span className={handles.categoryName}>
                          {category.name}
                        </span>
                        {showArrows && category.children?.length && (
                          <span aria-hidden="true">›</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  )
}

MenuCustom.schema = {
  title: 'Menu Lateral Departamentos',
  description: 'Menu lateral com departamentos e categorias VTEX',
  type: 'object',
  properties: {
    isActive: {
      title: 'Ativar Menu',
      type: 'boolean',
      default: true,
    },
    buttonLabel: {
      title: 'Texto do botão',
      type: 'string',
      default: 'Departamentos',
    },
    viewAllText: {
      title: 'Texto do link "Ver todos"',
      type: 'string',
      default: 'Ver todos',
    },
    showDepartmentIcons: {
      title: 'Mostrar ícones',
      type: 'boolean',
      default: true,
    },
    showArrows: {
      title: 'Mostrar setas',
      type: 'boolean',
      default: true,
    },
    iconMap: {
      title: 'Mapeamento de ícones',
      type: 'object',
      default: {},
    },
  },
}

export default MenuCustom
