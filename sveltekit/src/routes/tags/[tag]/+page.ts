import {api} from '$lib'
import {handleCache} from '@tuspe/components'
export async function load({fetch, params}) {
  const slug = params.tag,
    cacheKey = `tag-${slug}`,
    cache = handleCache(cacheKey)
  if (cache) {
    return cache
  }
  const results = await fetch(`${api}tags/${slug}`).then(res => res.json())
  handleCache(cacheKey, results)
  return {page: results}
}
