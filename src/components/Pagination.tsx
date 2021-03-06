import React from 'react'
import {
  IconButton,
  getTheme,
  Stack,
  CommandBarButton,
  ContextualMenuItemType,
} from '@fluentui/react'
import { useSelector, useDispatch } from 'react-redux'

import { actions } from '@/stores'
import { Number } from '@/utils/formatter'

export function Pagination() {
  const { skip, limit, count } = useSelector((state) => state.docs)
  const dispatch = useDispatch()
  const theme = getTheme()

  return (
    <Stack horizontal={true} styles={{ root: { alignItems: 'center' } }}>
      <CommandBarButton
        text={
          count
            ? `${skip + 1} ~ ${Math.min(
                skip + limit,
                count,
              )} of ${Number.format(count)}`
            : 'No Data'
        }
        style={{
          height: 32,
          color: theme.palette.neutralPrimary,
        }}
        menuProps={{
          items: [
            {
              key: '0',
              itemType: ContextualMenuItemType.Section,
              sectionProps: {
                title: 'Page Size',
                items: [25, 50, 100].map((l, i) => ({
                  key: i.toString(),
                  text: l.toString(),
                  onClick() {
                    dispatch(actions.docs.setLimit(l))
                  },
                })),
              },
            },
          ],
        }}
        menuIconProps={{ hidden: true }}
      />
      <IconButton
        iconProps={{ iconName: 'Back' }}
        disabled={skip <= 0}
        onClick={() => {
          dispatch(actions.docs.prevPage())
        }}
      />
      <IconButton
        iconProps={{ iconName: 'Forward' }}
        disabled={skip + limit >= count}
        onClick={() => {
          dispatch(actions.docs.nextPage())
        }}
      />
    </Stack>
  )
}
