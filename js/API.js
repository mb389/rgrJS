import axios from 'axios'
import ServerActions from './actions/ServerActions'

let API = {

  fetchLinks() {
    console.log("api works")
    axios.post('/graphql', { query: `{ links { _id, title, url } }` })
    .then(res => {
      console.log(res)
      ServerActions.receiveLinks(res.data.data.links)
    })
  }

}

export default API
