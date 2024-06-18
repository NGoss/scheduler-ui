import { useState, useEffect } from 'react'

import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'

function AddItem({callback, placeholder}) {
  const [adding, setAddingDisplayed] = useState(false)
  const [pending, setPending] = useState(false)
  const [input, setInput] = useState('')

  const handleOnClick = async () => {
    setPending(true)
    await callback(input)
    setPending(false)
    setAddingDisplayed(false)
  }

  return (
    <>
      {adding ? <Input placeholder={placeholder} onChange={(event) => setInput(event.target.value)} /> : null}
      <Button
        loading={pending}
        variant="outlined"
        size="sm"
        onClick={() => adding ? handleOnClick() : setAddingDisplayed(true)}>
        {adding ? 'Create' : '+'}
      </Button>
    </>
  )
}

export default AddItem
