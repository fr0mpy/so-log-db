import type en from '../messages/en/common.json'
import type enShell from '../messages/en/shell.json'
import type enConnectors from '../messages/en/connectors.json'

type CommonMessages = typeof en
type ShellMessages = typeof enShell
type ConnectorsMessages = typeof enConnectors

type Messages = CommonMessages & ShellMessages & ConnectorsMessages

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
