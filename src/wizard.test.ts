import { input, confirm } from "@inquirer/prompts";
import { CancelablePromise } from "@inquirer/type";
import runWizard, { validateGitHubUrl } from "./wizard";

jest.mock("@inquirer/prompts");

describe("Wizard tests", () => {
    it("should return correct options without exec", async () => {
        (input as jest.MockedFunction<typeof input>)
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("https://github.com/test_profile/test_git.git");
                })
            )
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("testBranch");
                })
            )
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("testDeployDir");
                })
            );

        (confirm as jest.MockedFunction<typeof confirm>).mockReturnValueOnce(
            new CancelablePromise<boolean>((resolve) => {
                resolve(false);
            })
        );

        const options = await runWizard();
        expect(options.repository).toBe("https://github.com/test_profile/test_git.git");
        expect(options.branch).toBe("testBranch");
        expect(options.deploy).toBe("testDeployDir");
        expect(options.exec).toBe(undefined);
    });

    it("should return correct options with exec", async () => {
        (input as jest.MockedFunction<typeof input>)
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("https://github.com/test_profile/test_git.git");
                })
            )
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("testBranch");
                })
            )
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("testDeployDir");
                })
            )
            .mockReturnValueOnce(
                new CancelablePromise<string>((resolve) => {
                    resolve("execTest");
                })
            );

        (confirm as jest.MockedFunction<typeof confirm>).mockReturnValueOnce(
            new CancelablePromise<boolean>((resolve) => {
                resolve(true);
            })
        );

        const options = await runWizard();
        expect(options.repository).toBe("https://github.com/test_profile/test_git.git");
        expect(options.branch).toBe("testBranch");
        expect(options.deploy).toBe("testDeployDir");
        expect(options.exec).toBe("execTest");
    });

    it("should return correct options with exec (with error url)", async () => {
        expect(validateGitHubUrl("https://github111.com/test_profile/test_git.git")).toBe("Please enter a valid GitHub Git URL");
        expect(validateGitHubUrl("https://github.com/test_profile/test_git.git")).toBeTruthy();
    });
});
