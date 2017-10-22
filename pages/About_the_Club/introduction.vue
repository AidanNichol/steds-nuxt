<template>
  <div>
      <p>
        <picture>

          <source media="(max-width: 440px)" srcset="/images/IntroImage350.jpg" />
          <img border="0" src="/images/IntroImage800.jpg"  />
        </picture>
  </p>

    <p>St. Edward's ABC Fellwalkers is a well established walking club that has
    been in existence since 1971. The archaeology embedded in our name reveals
    how we originated from a boxing club for the youth of a Whitley Bay based
    in the hall of a local Church.
    We are now a completely independent club with ties to neither the boxing
    club (which doesn't exist any more) nor the church (which does still exist).
    Look at our full <nuxt-link to="About_the_Club/history">history</nuxt-link> if
    you want to know more.</p>

    <p>Being based on Tyneside we are fortunate that we have good walking
    country in whatever direction we want to go (except east - we haven't
    mastered walking on water - yet). Northumberland, Durham, Cumbria,
    Scotland, and both the Yorkshire Dales and Moors feature heavily on our
    programme and give a lot of variety to what we can offer.</p>

    <p>We are an all-weather, all-year round walking club, with walks taking
    place every other Saturday. There is usually a choice of four walks,
    which vary in distance and height to cater for the individual walker's
    requirements. These will vary according to local conditions but are
    typically: -
  </p>

    <ol>
        <li>A 15-16 mile walk which will tend to reach the higher hills and is
        intended for the stronger walker.</li>

        <li>A 12-13 mile walk that will still tend to go fairly high but over a
        shorter distance.</li>

        <li>A 9-10 mile walk, which is similar to the 2nd walk with perhaps,
        less height gained.</li>

        <li>A 6-9 mile walk that is essentially low level with minimal hill
        walking.</li>
    </ol>
    <hr />

    <p>The club constitution declares our aim to be:-

    <blockquote>
        <p>Through a dynamic walking programme, members are encouraged to
        develop a companionship with fellow members and through this a deeper
        mutual enjoyment of the open fells.</p>

        <p>To achieve this aim, members help fellow members to participate
        fully in the understanding, use and relationship of maps and compass to
        the ground, in heightening an awareness of personal and group safety
        and in developing the potential leadership skills latent in us all</p>
    </blockquote>
    <hr />

    <p>Got a strong pair of boots, waterproofs and a rucksack? Then <nuxt-link to="About_the_Club/membership">join us</nuxt-link>. Look at the links under <nuxt-link to="About_the_Club/walkOrganization">Walk Organization</nuxt-link>
    to find out what will happen on your first trip and <nuxt-link to="About_the_Club/guidelines">Guidelines</nuxt-link> to find out about our
    approach to safety.</p>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
picture img {
  max-width: 720px;
  width: 100%;
}
</style>
