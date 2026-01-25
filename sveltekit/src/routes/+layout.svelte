<script lang="ts">
  import {page} from '$app/state'
  import {ButtonMenu} from '@tuspe/components'
  import {defaultDescription, introductory, metaData, siteName, siteUrl} from '$lib'
  import '../app.css'
  let {children} = $props(),
    menuShow = $state(false),
    width = $state(0)

  const closeMenu = () => (menuShow = false)
</script>

<svelte:head>
  {#if $metaData?.title}
    <title>{$metaData.title !== siteName ? `${$metaData.title} | ${siteName}` : siteName}</title>
    <meta name="twitter:title" property="og:title" content={$metaData.title} />
    <meta name="description" content={$metaData.description ?? defaultDescription} />
    <meta name="twitter:description" property="og:description" content={$metaData.description ?? defaultDescription} />
    <meta name="canonical" property="og:url" content={page.url.origin + page.url.pathname} />
    <meta name="twitter:image" property="og:image" content={$metaData.image ? $metaData.image : page.url.origin + '/familyworkout.jpg'} />
  {/if}
</svelte:head>

<svelte:window bind:innerWidth={width} />

<div class="flex flex-col min-h-screen relative">
  <header id="head" class="bg-dark flex items-center justify-between px-4 py-1 relative">
    <a href="/" rel="home">{siteName}</a>

    <ButtonMenu bind:open={menuShow} ariaControls="menu" hidden={width > 1119} title="Menu" />

    <nav id="menu" class:hidden={!menuShow && width <= 1120}>
      <a href="/" rel="home" onclick={closeMenu}>Home</a>
      {#each Object.values(introductory) as item}
        <a href={`/tag/${item.slug}`} onclick={closeMenu}>{item.title}</a>
      {/each}
    </nav>
  </header>

  <main class="block grow-1 max-w-screen-xl mx-auto px-4 py-10 w-full">
    {#if $metaData?.title}
      <div class="mb-6 text-center" id="page-title">
        {#if $metaData.subTitle}
          <div id="page-subTitle">{$metaData.subTitle}</div>
        {/if}
        <h1>{$metaData.title}</h1>
        {#if $metaData.titleLink && $metaData.titleLinkText}
          <a class="inline-block mt-4 uppercase" href={$metaData.titleLink} rel="noopener noreferrer" target="_blank">- {$metaData.titleLinkText} -</a>
        {/if}
      </div>
    {/if}
    {@render children?.()}
  </main>

  <footer class="bg-dark px-4 py-1 text-center text-gray-300">
    <small>
      All video credits and copyrights belong to their respective original publishers.<br />
      Created by
      <a class="text-gray-300" href="https://timoanttila.com/" title="Full Stack Web Developer Timo Anttila" hreflang="en">Timo Anttila</a>,
      <a class="text-gray-300" href="https://tuspe.com/en" hreflang="en">Tuspe Design Oy</a>
    </small>
  </footer>
</div>
