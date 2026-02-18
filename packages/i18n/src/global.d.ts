import type en from '../messages/en/common.json'
import type enShell from '../messages/en/shell.json'
import type enAgentToolkit from '../messages/en/agent-toolkit.json'

type CommonMessages = typeof en
type ShellMessages = typeof enShell
type AgentToolkitMessages = typeof enAgentToolkit

type Messages = CommonMessages & ShellMessages & AgentToolkitMessages

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
