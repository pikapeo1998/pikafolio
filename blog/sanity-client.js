
import {createClient} from 'https://esm.sh/@sanity/client@8.10.0'

export const client = createClient({
  projectId: 'o1klbuxt',
  dataset: 'production',
  apiVersion: '2026-11-13',
  useCdn: true,
  perspective: 'published',
})

// Lấy danh sách bài viết đã xuất bản
export async function getPosts() {
  return client.fetch(`
    *[_type == "post" && defined(slug.current)]
    | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "category": category->title,
      "categorySlug": category->slug.current,
      "thumbnail": thumbnail.asset->_ref,
      tags,
      seoTitle,
      seoDescription,
      content
    }
  `)
}

// Lấy một bài viết theo Slug
export async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "category": category->title,
      "categorySlug": category->slug.current,
      "thumbnail": thumbnail.asset->_ref,
      tags,
      seoTitle,
      seoDescription,
      content
    }
  `, {slug})
}

// Lấy danh sách danh mục
export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      title,
      "slug": slug.current
    }
  `)
}

// Chuyển ảnh Sanity thành đường dẫn ảnh
export function getImageUrl(ref, width = 1200) {
  if (!ref) return ''

  const match = ref.match(/^image-(.+)-(\d+x\d+)-(\w+)$/)
  if (!match) return ''

  const [, id, dimensions, format] = match

  return `https://cdn.sanity.io/images/o1klbuxt/production/${id}-${dimensions}.${format}?w=${width}&auto=format`
}
