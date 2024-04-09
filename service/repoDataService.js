import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export const repoDataService = {
  async getRepoFileContent(owner, repo, path) {
    try {
      const response = await octokit.repos.getContent({ owner, repo, path });
      const content = Buffer.from(response.data.content, "base64").toString(
        "utf-8"
      );
      return content;
    } catch (error) {
      console.error("Error in repoDataService - getRepoFileContent:", error);
      throw error;
    }
  },
};
