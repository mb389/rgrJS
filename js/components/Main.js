import React, {Component} from 'react'
import Relay from 'react-relay'
import Link from './Link'
import CreateLinkMutation from '../mutations/CreateLinkMutation'

class Main extends Component {
  setLimit = (e) => {
    let newLimit = Number(e.target.value)
    this.props.relay.setVariables({limit: newLimit})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Relay.Store.update(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newURL.value,
        store: this.props.store
      })
    )
    this.refs.newTitle.value = ""
    this.refs.newUrl.value = ""
  }

  render() {
    let content = this.props.store.linkConnection.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />
    })
    return <div>
      <h3>Links</h3>
      <form onSubmit={this.handleSubmit}>
      <input type='text' placeholder="Title" ref="newTitle"></input>
      <input type='text' placeholder="URL" ref="newURL"></input>
      <button type='submit'>Add</button>
        </form>
      Showing: &nbsp;
      <select onChange={this.setLimit} defaultValue={this.props.relay.variable.limit}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <ul>
        {content}
      </ul>
    </div>
  }
}

Main = Relay.createContainer(Main, {
  initialVars: {
    limit: 4
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        linkConnection(first: $limit) {
          edges {
            node {
              id,
              ${Link.getFragment('link')}
            }
          }
        }
      }
    `
  }
})

export default Main
