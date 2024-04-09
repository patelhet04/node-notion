import { repoDataService } from "../service/repoDataService.js";

export const repoDataController = {
  async fetchInternshipListings(req, res) {
    try {
      const owner = process.env.GITHUB_OWNER;
      const repo = process.env.GITHUB_REPO;
      const path = process.env.GITHUB_PATH; // Replace with actual file path

      const content = await repoDataService.getRepoFileContent(
        owner,
        repo,
        path
      );

      // Here you can parse and manipulate the content as needed
      // ...

      return content;
    } catch (error) {
      console.error(
        "Error in repoDataController - fetchInternshipListings:",
        error
      );
      throw error; // Changed from res.status(500).send("Internal Server Error")
    }
  },
};
