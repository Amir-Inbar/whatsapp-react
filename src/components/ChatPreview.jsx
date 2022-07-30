import { eventBusService } from '../services/eventBus.service'

import { UseLoadParticipants } from '../hooks/useChatData'

import { ContactPreview } from './ContactPreview/ContactPreview'

export const ChatPreview = (props) => {
  const data = UseLoadParticipants(props.chat)
  return (
    <>
      {data.data && (
        <ContactPreview contact={data.data[0]} func={() => eventBusService.emit('setSelectedChat', props.chat)} />
      )}
    </>
  )
}
