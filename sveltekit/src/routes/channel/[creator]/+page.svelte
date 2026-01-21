<script lang="ts">
  import {validateArray} from '@tuspe/components'
  import {metaData} from '$lib'
  import VideoList from '$lib/VideoList.svelte'
  import type {VideoPublisher} from '$lib/types'

  let {data}: {data: {page: VideoPublisher}} = $props(),
    page = $state<VideoPublisher | null>(null),
    pageId = $state(0)

  $effect(() => {
    if (pageId !== data.page.id) {
      pageId = data.page.id
      page = data.page

      $metaData = {
        description: 'Workout YouTube videos for lazy people created by ' + page.title,
        subTitle: 'YouTube',
        title: page.title,
        titleLink: `https://www.youtube.com/channel/${page.channel_id}`,
        titleLinkText: 'Subscribe on YouTube'
      }
    }
  })
</script>

{#if page?.videos && validateArray(page.videos)}
  <iframe class="aspect-video block border border-gray-600 mb-6 rounded-lg w-full" src={`https://www.youtube.com/embed/${page.videos[0].video_id}`} title={`Workout video on YouTube: ${data.page.title}`}></iframe>
  {#if page.videos.length > 1}
    <VideoList hasPubliser={false} values={page.videos.slice(1)} />
  {/if}
{/if}
