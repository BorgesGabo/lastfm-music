import config from './config'

const apiKey = config.apiKey
    // es lo mismo que decir ..... const { apiKey } = config
    //EL API_KEY lo tomamos del archivo config.js
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

export default function getArtists(country) {
    //busque en URL la palabra country y reemplace por el argumento de la funcion
    const url = URL.replace(':country', country)
        //request del navegador
    return fetch(url)
        //esta es la promesa
        .then(res => res.json())
        .then(json => json.topartists.artist)
}