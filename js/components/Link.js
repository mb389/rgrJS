import React, {Component} from 'react'
import Relay from 'react-relay'
import moment from 'moment'

class Link extends Component {
  dateStyle = () => ({
    color: '#888',
    fontSize: '0.7em',
    marginRight: '0.5em'
  })
  dateLabel = () => moment(this.props.link.createdAt).format('L')
  render() {
    let {link} = this.props
    return (
      <li>
        <span style={this.dateStyle()}>
          {this.dateLabel()}
        </span>
        <a href={link.url}>{link.title}</a>
      </li>
    )
  }
}

Link = Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL`
      fragment on Link {
          title,
          url,
          createdAt
      }
    `
  }
})

export default Link
