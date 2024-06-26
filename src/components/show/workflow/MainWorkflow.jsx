import { useState, useEffect } from 'react'

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

import Actors from 'src/components/show/reference/Actors'
import Scenes from 'src/components/show/reference/Scenes'
import Characters from 'src/components/show/reference/Characters'

import { useShow } from 'src/context/showContext'
import { useTab, useTabDispatch } from 'src/context/tabContext'

function MainWorkflow() {
  const show = useShow()

  const tab = useTab()
  const tabDispatch = useTabDispatch()

  if (!show) {
    return null
  }

  return (
    <>
    <Sheet>
      <Tabs onChange={
          (event, newValue) => {
            tabDispatch({
              type: 'open',
              active: newValue
            })
          }
        }
      orientation="horizontal" size="lg" value={tab.active}>
        <TabList>
          <Tab
            variant="outlined"
            color="primary">Rehearsals</Tab>
          <Tab
            variant="outlined"
            color="primary">Scenes</Tab>
          <Tab
            variant="outlined"
            color="primary">Characters</Tab>
          <Tab
            variant="outlined"
            color="primary">Actors</Tab>
          <Tab
            variant="outlined"
            color="primary">Staff</Tab>
        </TabList>
        <TabPanel value={0}>
          Rehearsals
        </TabPanel>
        <TabPanel value={1}>
          <Scenes />
        </TabPanel>
        <TabPanel value={2}>
          <Characters />
        </TabPanel>
        <TabPanel value={3}>
          <Actors />
        </TabPanel>
        <TabPanel value={4}>
          Staff
        </TabPanel>
      </Tabs>
    </Sheet>
    </>
  )
}

export default MainWorkflow
