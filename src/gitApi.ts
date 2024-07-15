import { OptionValues } from "commander";
import crypto from "crypto";
import fs from "fs";
import { execSync } from "child_process";

const delay = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
const tmpDirName = crypto.randomBytes(20).toString("hex");
const atempts = 3;

export interface ExecError {
    status: number;
    signal: number | null;
    output: Buffer[];
    pid: number;
    stdout: Buffer;
    stderr: Buffer;
}

export function showMessage(message: string, options?: OptionValues) {
    if(!options?.silence){
        console.log(message);
    }
}

export function isExecError(e: unknown): e is ExecError {
    return (
        !!e &&
        typeof e === "object" &&
        "status" in e &&
        typeof e.status === "number" &&
        "signal" in e &&
        (typeof e.signal === "number" || e.signal === null) &&
        "output" in e &&
        Array.isArray(e.output) &&
        "pid" in e &&
        typeof e.pid === "number" &&
        "stdout" in e &&
        e.stdout instanceof Buffer &&
        "stderr" in e &&
        e.stderr instanceof Buffer
    );
}

export default async function publish(options: OptionValues) {
    try {
        if (options.exec) {
            showMessage("Execute pre-deploy actions...", options);
            execSync(`${options.exec}`);
        }
        showMessage("Prepare repository...", options);
        execSync(`git clone ${options.repository} ${tmpDirName}`, { stdio: ["ignore", "pipe", "pipe"] });
        execSync(`git checkout ${options.branch}`, { cwd: tmpDirName, stdio: ["ignore", "pipe", "pipe"] });

        showMessage("Copy files from deploy dir...", options);
        fs.cpSync(options.deploy, tmpDirName, { recursive: true });

        showMessage("Commit and push files to repo...", options);
        execSync(`git add .`, { cwd: tmpDirName, stdio: ["ignore", "pipe", "pipe"] });
        execSync(`git commit -m "GitHub Pages deploy"`, { cwd: tmpDirName, stdio: ["ignore", "pipe", "pipe"] });
        execSync(`git push`, { cwd: tmpDirName, stdio: ["ignore", "pipe", "pipe"] });
        showMessage("Done!", options);
    } catch (error) {
        console.log("Something went wrong, deploy haven't done:");
        if (isExecError(error)) {
            console.error(`${error.stdout}\n${error.stderr}`);
        } else {
            console.error(error);
        }
    }

    await delay(1000);

    while (atempts > 0) {
        try {
            fs.rmSync(tmpDirName, { recursive: true, force: true });
            break;
        } catch {
            // eslint-disable-next-line no-await-in-loop
            await delay(500);
        }
    }
}
