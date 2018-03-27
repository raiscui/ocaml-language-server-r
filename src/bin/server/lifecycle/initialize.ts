import * as LSP from "vscode-languageserver-protocol";
import { ISettings } from "../../../lib";
import capabilities from "../capabilities";
import Session from "../session";

export default function(
  session: Session,
): LSP.RequestHandler<LSP.InitializeParams, LSP.InitializeResult, LSP.InitializeError> {
  return async event => {
    const overrides: ISettings = { reason: event.initializationOptions };
    (session.initConf as any) = event;
    session.settings.reason = ISettings.withDefaults(overrides).reason;
    await session.initialize();
    return { capabilities };
  };
}
