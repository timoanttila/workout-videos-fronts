import {api, category} from '$lib'
import {handleCache} from '@tuspe/components'
export async function load({fetch, params}) {
  const slug = params.tag,
    cacheKey = `tag-${slug}`,
    cache = handleCache(cacheKey)
  if (cache?.id) {
    return {page: cache}
  }
  const results = await fetch(`${api}videoTags${category}&slug=${slug}`).then(res => res.json())
  handleCache(cacheKey, results)
  return {page: results}
}
