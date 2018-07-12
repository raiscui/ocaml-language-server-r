import { ChildProcess } from "child_process";
import * as LSP from "vscode-languageserver-protocol";
import Session from "../session";

export default class ReFMT {
  public readonly process: ChildProcess;
  constructor(session: Session, id?: LSP.TextDocumentIdentifier, argsOpt?: string[]) {
    const uri = id ? id.uri : ".re";
    const command = session.settings.reason.path.refmt;

    const width = session.settings.reason.format.width;
    const widthArg = width === null ? [] : ["--print-width", `${width}`];

    const args = argsOpt || ["--parse", "re", "--print", "re", "--interface", `${/\.rei$/.test(uri)}`].concat(widthArg);
    this.process = session.environment.spawn(command, args);
    this.process.on("error", error => session.error(`refmt Error formatting file: ${error}`));
  }
}
