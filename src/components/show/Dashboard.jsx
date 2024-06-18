import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import Typography from '@mui/joy/Typography'
import Link from '@mui/joy/Link'
import Tab from '@mui/joy/Tab'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/Tablist'
import TabPanel from '@mui/joy/TabPanel'
import Breadcrumbs from '@mui/joy/Breadcrumbs'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import HomeIcon from '@mui/icons-material/Home'

import { useShowDispatch, useShow } from 'src/context/showContext'

import Actors from 'src/components/show/reference/Actors'
import Scenes from 'src/components/show/reference/Scenes'
import MainWorkflow from 'src/components/show/workflow/MainWorkflow'
import ToDoWorkflow from 'src/components/show/workflow/ToDoWorkflow'

import showsApi from 'src/api/shows'

function Dashboard({ show }) {
  const dispatch = useShowDispatch()

  useEffect(() => {
    dispatch({
      type: 'load',
      show
    })
  }, [])

  return (
    <>
      <Breadcrumbs size="lg" separator="|">
        <Link href="/" >
          <HomeIcon />
        </Link>
        <Link href={`/show/${show.id}`}>
          <Typography level="h3">{show.name}</Typography>
        </Link>
      </Breadcrumbs>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <MainWorkflow />
        <ToDoWorkflow />
      </Stack>
    </>
  )
}

export default Dashboard
