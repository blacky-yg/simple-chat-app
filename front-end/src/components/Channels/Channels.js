import {useState, useEffect} from 'react';
import axios from 'axios';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
// Layout
import Link from '@material-ui/core/Link'

const styles = {
  root: {
    minWidth: '200px',
  },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap',
  }
}

function Channels({ onChannel }) {
  const [channels, setChannels] = useState([])
  useEffect( () => {
    const fetch = async () => {
      const {data: channels} = await axios.get(process.env.REACT_APP_API_BASE_URL + '/channels')
      setChannels(channels)
    }
    fetch()
  }, [])
  return (
    <ul style={styles.root}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href="#"
            onClick={ (e) => {
              e.preventDefault()
              onChannel(channel)
            }}
            >
            {channel.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Channels