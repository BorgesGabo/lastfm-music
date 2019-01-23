<template lang="pug">
#app
  img(src='https://borgesgabo.github.io/lastfm-music/dist/logo.png')
  h1 herbert-Music
  
  select(v-model="SelectedCountry")
    option(v-for="country in countries"  v-bind:value="country.value") {{country.name}}
  spinner(v-show="loading")
  ul  
    <!--creacion de un nuevo componente-->
    artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")

  <!-- para referencia como escribir en pug
  h2 Essential Links
  ul
    li
      a(href='https://vuejs.org', target='_blank') Core Docs
    li
      a(href='https://forum.vuejs.org', target='_blank') Forum
    li
      a(href='https://chat.vuejs.org', target='_blank') Community Chat
    li
      a(href='https://twitter.com/vuejs', target='_blank') Twitter
  h2 Ecosystem
  ul
    li
      a(href='http://router.vuejs.org/', target='_blank') vue-router
    li
      a(href='http://vuex.vuejs.org/', target='_blank') vuex
    li
      a(href='http://vue-loader.vuejs.org/', target='_blank') vue-loader
    li
      a(href='https://github.com/vuejs/awesome-vue', target='_blank') awesome-vue -->
</template>

<script>
import Spinner from './components/Spinner.vue'
import Artist from './components/Artist.vue'
import getArtists from './api'
export default {
  name: 'app',
  data () {
    return {
      artists: [ ],
      countries: [
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'colombia'},
        {name: 'España', value: 'spain'},
      ],
      //default data country
      SelectedCountry: 'argentina',
      loading: true
    }
  },
  components: {
    Artist,
    Spinner
  },
  methods:{
    refreshArtists(){
      const self = this 
      this.loading = true
      this.artists = []
      getArtists(this.SelectedCountry)
        .then(function(artists){
          self.loading = false
          self.artists = artists
          
        })

    }
  },
  mounted() {
      this.refreshArtists()
  },
  //objeto que esta pendiente de cambios en la vista
  watch: {
    //cuando cambie el pais seleccionado refrescar el lista de artistas l.55
    SelectedCountry: function () {
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
