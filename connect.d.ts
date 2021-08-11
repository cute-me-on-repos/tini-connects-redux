import { ConnectOption, PageComponentOption } from './types'
export default function connect({
  type,
  mapState,
  mapDispatch,
  manual,
}?: ConnectOption): (options: PageComponentOption) => void | PageComponentOption
export declare class Connector {
  type: Pick<ConnectOption, 'type'>
  mapState: Pick<ConnectOption, 'mapState'>
  mapDispatch: Pick<ConnectOption, 'mapDispatch'>
  manual: Pick<ConnectOption, 'manual'>
  constructor(
    type?: Pick<ConnectOption, 'type'>,
    mapState?: Pick<ConnectOption, 'mapState'>,
    mapDispatch?: Pick<ConnectOption, 'mapDispatch'>,
    manual?: Pick<ConnectOption, 'manual'>,
  )
  setType(type: Pick<ConnectOption, 'type'>): Connector
  setMapState(mapState: Pick<ConnectOption, 'mapState'>): Connector
  setMapDispatch(mapDispatch: Pick<ConnectOption, 'mapDispatch'>): Connector
  setManual(manual: Pick<ConnectOption, 'manual'>): Connector
}
