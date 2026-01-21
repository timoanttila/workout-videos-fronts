<script lang="ts">
  import {validateArray} from '@tuspe/components'
  import {metaData, sendRequest} from '$lib'
  import VideoList from '$lib/VideoList.svelte'
  import type {Video} from '$lib/types'

  let {data}: {data: {page: Video}} = $props(),
    page = $state<Video | null>(null),
    pageId = $state(0),
    watchMore = $state<Video[]>([])

  const fetchPublisherVideos = async (publisherId: number) => {
    watchMore = []
    const results = await sendRequest(`videoPublishers/${publisherId}`)
    if (results?.videos && validateArray(results.videos)) {
      watchMore = results.videos.filter((video: Video) => video.id !== data.page.id)
    }
  }

  $effect(() => {
    if (pageId !== data.page.id) {
      pageId = data.page.id
      page = data.page
      $metaData = {
        subTitle: page.publisher.title,
        title: page.title,
        description: page.description ?? 'Workout YouTube video for lazy people created by ' + page.publisher.title
      }
      if (page.publisher_id) {
        fetchPublisherVideos(page.publisher_id)
      }
    }
  })
</script>

{#if page?.title}
  <div class="mb-10">
    <iframe class="aspect-video block border border-gray-600 rounded-lg w-full" id="video" src={`https://www.youtube.com/embed/${page.video_id}`} title={`YouTube: ${data.page.title}`}></iframe>
    <a class="inline-block ml-2 mt-4" href={`https://www.youtube.com/${page.publisher.channel_id}`} id="video-youtube-channel" rel="noopener" target="_blank" title={`YouTube Channel ${page.publisher.title}`}>Subscribe on YouTube </a>
    {#if page.description}
      <div class="mt-4" id="video-summary">{page.description}</div>
    {/if}
  </div>

  {#if validateArray(watchMore)}
    <h2>More videos from {page.publisher.title}</h2>
    <VideoList hasPubliser={false} values={watchMore} />
  {/if}
{/if}
