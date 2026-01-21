<script lang="ts">
  import {onMount} from 'svelte'
  import {page} from '$app/state'
  import {Button, Input, preventDefault, validateArray} from '@tuspe/components'
  import {defaultDescription, metaData, sendRequest, siteName} from '$lib'
  import VideoList from '$lib/VideoList.svelte'
  import type {Query, Video} from '$lib/types'

  $metaData = {
    title: siteName,
    description: 'Lazy People Workouts'
  }

  let keyword = $state(''),
    pageNumber = $state(0),
    pageSize = $state(12),
    query = $state<Query | undefined>(undefined),
    videos = $state<Video[]>([])

  const getVideos = async (loadMore = false) => {
    pageNumber = loadMore ? pageNumber + 1 : 1

    let params = `page=${pageNumber}&limit=${pageSize}`

    if (keyword) {
      params += `&q=${keyword}`
    }

    const results = await sendRequest('videos', params)
    query = results.query
    videos = loadMore ? [...videos, ...results.data] : results.data
  }

  onMount(() => {
    const title = page.url.searchParams.get('q')

    if (title) {
      keyword = title
    }

    getVideos()
  })
</script>

<div class="mb-6 max-w-screen-md mx-auto">{defaultDescription}</div>

<form onsubmit={preventDefault(() => getVideos(false))} class="gap-4 grid mb-10 sm:grid-cols-2 md:grid-cols-3 max-w-screen-sm mx-auto pb-4 px-4 pt-2 rounded-lg">
  <Input bind:value={keyword} outerClass="md:col-span-2" label="Keyword" max={50} min={3} />
  <div class="flex">
    <Button colorBg="blue-900" extraClass="self-end md:w-full" type="submit">Search</Button>
  </div>
</form>

{#if validateArray(videos)}
  <VideoList {query} values={videos} />

  {#if videos.length > 1 && query?.hasNext}
    <div class="mt-10 text-center">
      <Button colorBg="blue-900" onclick={() => getVideos(true)}>Next {pageSize} videos</Button>
    </div>
  {/if}
{/if}
