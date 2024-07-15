import childProcess from "child_process";
import fs from "fs";
import publish, { ExecError, isExecError, showMessage } from "./gitApi";

jest.mock("fs");
jest.mock("child_process");

describe("Git API tests", () => {
    it("check ExecError", () => {
        const error: ExecError = {
            status: 1,
            signal: null,
            output: [],
            pid: 123,
            stdout: Buffer.from("test stdout"),
            stderr: Buffer.from("test stderr"),
        };

        const notError = {
            status: 1,
            signal: null,
            output: "Test error",
            pid: 123,
            stdout: Buffer.from("test stdout"),
            stderr: Buffer.from("test stderr"),
        };

        expect(isExecError(error)).toBeTruthy();
        expect(isExecError(notError)).not.toBeTruthy();
    });

    it("test publish", async () => {
        const execSpy = jest.spyOn(childProcess, "execSync").mockReturnValue("exec done");
        const cpSpy = jest.spyOn(fs, "cpSync").mockReturnValue();
        const rmSpy = jest.spyOn(fs, "rmSync").mockReturnValue();

        const testOpts = {
            repository: "test repo",
            branch: "test brnch",
            deploy: "test deploy dir",
        };

        await publish(testOpts);

        expect(execSpy).toHaveBeenCalledTimes(5);
        expect(cpSpy).toHaveBeenCalledTimes(1);
        expect(rmSpy).toHaveBeenCalledTimes(1);
    });

    it("test publish with exec", async () => {
        const execSpy = jest.spyOn(childProcess, "execSync").mockReturnValue("exec done");
        const cpSpy = jest.spyOn(fs, "cpSync").mockReturnValue();
        const rmSpy = jest.spyOn(fs, "rmSync").mockReturnValue();

        const testOpts = {
            repository: "test repo",
            branch: "test brnch",
            deploy: "test deploy dir",
            exec: "test exec",
        };

        await publish(testOpts);

        expect(execSpy).toHaveBeenCalledTimes(6);
        expect(cpSpy).toHaveBeenCalledTimes(1);
        expect(rmSpy).toHaveBeenCalledTimes(1);
    });

    it("test publish with errors", async () => {
        const error: ExecError = {
            status: 1,
            signal: null,
            output: [],
            pid: 123,
            stdout: Buffer.from("test stdout"),
            stderr: Buffer.from("test stderr"),
        };
        const execSpy = jest.spyOn(childProcess, "execSync").mockImplementation((command: string) => {
            if (command.includes("commit")) {
                throw error;
            } else {
                return command;
            }
        });
        const cpSpy = jest.spyOn(fs, "cpSync").mockReturnValue();
        const rmSpy = jest
            .spyOn(fs, "rmSync")
            .mockImplementationOnce(() => {
                throw new Error("remove error");
            })
            .mockImplementation(() => {});
        const logSpy = jest.spyOn(console, "error");

        const testOpts = {
            repository: "test repo",
            branch: "test brnch",
            deploy: "test deploy dir",
            exec: "test exec",
        };

        await publish(testOpts);

        expect(execSpy).toHaveBeenCalledTimes(5);
        expect(cpSpy).toHaveBeenCalledTimes(1);
        expect(rmSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith("test stdout\ntest stderr");
    });

    it("test publish with unknown errors", async () => {
        const execSpy = jest.spyOn(childProcess, "execSync").mockImplementation((command: string) => {
            if (command.includes("commit")) {
                throw new Error("unknown error");
            } else {
                return command;
            }
        });
        const cpSpy = jest.spyOn(fs, "cpSync").mockReturnValue();
        const rmSpy = jest.spyOn(fs, "rmSync").mockReturnValue();
        const logSpy = jest.spyOn(console, "error");

        const testOpts = {
            repository: "test repo",
            branch: "test brnch",
            deploy: "test deploy dir",
            exec: "test exec",
        };

        await publish(testOpts);

        expect(execSpy).toHaveBeenCalledTimes(5);
        expect(cpSpy).toHaveBeenCalledTimes(1);
        expect(rmSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(new Error("unknown error"));
    });

    it("test shoMessage", () => {
        const logSpy = jest.spyOn(console, "log");

        showMessage("error", { silence: true });
        showMessage("test 1", { silence: false });
        showMessage("test 2");

        expect(logSpy).toHaveBeenCalledWith("test 1");
        expect(logSpy).toHaveBeenCalledWith("test 2");
    });
});
