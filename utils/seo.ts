import { siteConfig } from '~/config/site'

interface BreadcrumbItem {
  name: string
  path: string
}

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}
