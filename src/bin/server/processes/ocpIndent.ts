import { ChildProcess } from "child_process";
import Session from "../session";

export default class OcpIndent {
  public readonly process: ChildProcess;
  constructor(session: Session, args?: string[]) {
    const command = session.settings.reason.path.ocpindent;
    const args1 = ["--parse", "ml", "--print", "ml"].concat(args || []);

    this.process = session.environment.spawn(command, args1);
    this.process.on("error", error => session.error(`Error formatting file: ${error}`));
  }
}
