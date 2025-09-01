<script lang="ts">
  import {validateArray} from '@tuspe/components'
  import {metaData} from '$lib'
  import VideoList from '$lib/VideoList.svelte'
  import type {Video} from '$lib/types'

  let {data}: {data: {page: Video}} = $props(),
    page = $state<Video | null>(null),
    pageId = $state(0)

  $effect(() => {
    if (pageId !== data.page.id) {
      pageId = data.page.id
      page = data.page
      $metaData = {
        subTitle: page.publisher.title,
        title: page.title,
        description: page.summary ?? 'Workout YouTube video for lazy people created by ' + page.publisher.title
      }
    }
  })
</script>

{#if page?.title}
  <div class="mb-10">
    <iframe class="aspect-video block border border-gray-600 rounded-lg w-full" id="video" src={`https://www.youtube.com/embed/${page.videoId}`} title={`YouTube: ${data.page.title}`}></iframe>
    <a class="inline-block ml-2 mt-4" href={`https://www.youtube.com/channel/${page.publisher.channelId}`} id="video-youtube-channel" rel="noopener" target="_blank" title={`YouTube Channel ${page.publisher.title}`}>Subscribe on YouTube </a>
    {#if page.summary}
      <div class="mt-4" id="video-summary">{page.summary}</div>
    {/if}
  </div>

  {#if page.publisher?.videos && validateArray(page.publisher.videos)}
    <h2>More videos from {page.publisher.title}</h2>
    <VideoList hasPubliser={false} values={page.publisher.videos} />
  {/if}
{/if}
