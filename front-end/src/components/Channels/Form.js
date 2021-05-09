import { useState } from 'react'
import axios from 'axios';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
// Layout
import Button from "@material-ui/core/Button"

import SendIcon from "@material-ui/icons/Send";
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';

const useStyles = (theme) => {
 
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    form: {
      borderTop: `2px solid ${borderColor}`,
      padding: '.5rem',
      display: 'flex',
    },
    content: {
      flex: '1 1 auto',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1),
      },
    },
    send: {
    },
  }
}

function Form ({ addMessage, channel }) {
  const [content, setContent] = useState('')
  const styles = useStyles(useTheme())

  const onSubmit = async () => {
    const authorInfo = await axios.get(process.env.REACT_APP_API_BASE_URL+ `/users/${localStorage.getItem("user_id")}`)
    const author = authorInfo.data["username"]
    let data = {
      content: content,
      author: author,
      channelId: channel.id
    };
    const {data: message} = await axios.post(process.env.REACT_APP_API_BASE_URL + `/channels/${channel.id}/messages`, data)
    addMessage(message.content)
    setContent('')
  }

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
      <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        rowsMax={4}
        value={content}
        onChange={handleChange}
        variant="outlined"
        css={styles.content}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          css={styles.send}
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </form>
  )
}

export default Form