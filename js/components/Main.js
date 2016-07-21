import React, {Component} from 'react'
import API from '../API'
import LinkStore from '../stores/LinkStore'

let _getAppState = () => {
  return { links: LinkStore.getAll() }
}

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    API.fetchLinks()
    LinkStore.on('change',this.onChange)
  }
  componentWillUnmount() {
    LinkStore.removeListener('change',this.onChange)
  }
  onChange() {
    console.log("in view")
    this.setState(_getAppState())
  }
  render() {
    console.log(this.state)
    let content = this.state.links.map(link => {
      return <li key = {link._id}>
        <a href={link.url}>{link.title}</a>
      </li>
    })
    return <div>
      <h3>Links</h3>
      <ul>
        {content}
      </ul>
    </div>
  }
}
