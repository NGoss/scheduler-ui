import { useState, useEffect } from 'react'

import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Chip from '@mui/joy/Chip'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

function ShowCard({data}) {

  return (
    <>
    <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: 320,
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        }}
      >
        <CardContent>
          <Typography level="title-lg" id="card-description">
            <Link
              overlay
              underline="none"
              href={`/show/${data.id}`}
              sx={{ color: 'text.tertiary' }}
            >
              {data.name}
            </Link>
          </Typography>
          {data.staff?.map(s => <Typography level="body-sm">{s.name}</Typography>)}
          <Stack direction="row" spacing={1}>
            <Chip
              variant="outlined"
              color={data.scenes.length > 0 ? 'primary' : 'danger'}
              size="sm"
              sx={{ pointerEvents: 'none' }}
            >
              Scenes: {data.scenes.length}
            </Chip>
            <Chip
              variant="outlined"
              color={data.rehearsals.length > 0 ? 'primary' : 'danger'}
              size="sm"
              sx={{ pointerEvents: 'none' }}
            >
              Rehearsals: {data.rehearsals.length}
            </Chip>
            <Chip
              variant="outlined"
              color={data.actors.length > 0 ? 'primary' : 'danger'}
              size="sm"
              sx={{ pointerEvents: 'none' }}
            >
              Actors: {data.actors.length}
            </Chip>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default ShowCard
