import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import { ShowProvider } from 'src/context/showContext'
import { TabProvider } from 'src/context/tabContext'
import Dashboard from 'src/components/show/Dashboard'

import showsApi from 'src/api/shows'

export async function loader({ params }) {
  const show = await showsApi.findShow(params.showId);
  return { show: show.data };
}

function Show() {
  const { show } = useLoaderData()

  return (
    <>
      <TabProvider>
        <ShowProvider>
          <Dashboard show={show}/>
        </ShowProvider>
      </TabProvider>
    </>
  )
}

export default Show
