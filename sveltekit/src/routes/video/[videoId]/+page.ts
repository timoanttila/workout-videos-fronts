import {api} from '$lib'
import {handleCache} from '@tuspe/components'
export async function load({fetch, params}) {
  const id = Number(params.videoId),
    cacheKey = `video-${id}`,
    cache = handleCache(cacheKey)
  if (cache?.id) {
    return {page: cache}
  }
  const results = await fetch(`${api}videos/${id}`).then(res => res.json())
  handleCache(cacheKey, results)
  return {page: results}
}
