import {useRef, useState} from 'react';
import axios from 'axios';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// Local
import Form from './Form'
import List from './List'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,.2)',
    position: 'relative',
  },
  fab: {
    position: 'absolute !important',
    // position: 'fixed !important',
    top: theme.spacing(2),
    // width: '50px',
    // bottom: '0',
    // marginLeft: '100%',
    // bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

function Channel({ channel }) {
  const styles = useStyles(useTheme())
  const listRef = useRef();
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    await axios.get(process.env.REACT_APP_API_BASE_URL + `/channels/${channel.id}/messages`)
      .then((response) => {
        if (response.status === 200) {
            let messages = response.data;
            setMessages(messages)
            if(listRef.current)
              listRef.current.scroll()
        } else
          console.log("pas de message")
      })
      .catch((error) => console.log(error))
  }

  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }

  return (
    <div css={styles.root}>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={channel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}

export default Channel