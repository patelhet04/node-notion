# Node.js and Notion Integration Service

This project is a Node.js server built with Fastify, designed to synchronize data with a Notion database automatically. It is configured to run periodically, ensuring your Notion database stays up-to-date. This is a simple service that allows you to have your keep track of all your applcations on notion.

## Data Source

This project fetches internship listings from the [SimplifyJobs/Summer2024-Internships](https://github.com/SimplifyJobs/Summer2024-Internships) GitHub repository. This repository is an invaluable community-curated collection of internship opportunities. I recommend visiting the original repository for the most up-to-date listings and to contribute any new opportunities you come across.

### A Special Thank You

I extend our heartfelt thanks to the maintainers and contributors of the [SimplifyJobs/Summer2024-Internships](https://github.com/SimplifyJobs/Summer2024-Internships) repository. Your diligent work in curating and updating this list plays a crucial role in helping students and early-career professionals find impactful internship opportunities. Your contributions to the community are genuinely appreciated.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your local machine.
- A Notion account with the ability to create and manage databases.
- A Notion integration created for API access.

### Forking the Repository (Optional)

If you're interested in contributing to this project, consider forking the repository first. This allows you to make changes in your own copy of the project:

1. Navigate to the original repository on GitHub.
2. In the top-right corner of the page, click **Fork**.

### Setting Up Your Local Environment

After forking, clone your forked repository to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-FORKED-REPO
cd YOUR-FORKED-REPO
npm install
npm start
```

### Notion Configuration

Obtaining Your API Key and Database ID

- Create a new integration in Notion Integrations to obtain your NOTION_API_KEY.
- Share the integration with the database you intend to synchronize with.
- Find your NOTION_DATABASE_ID from the URL when viewing your database as a full page in Notion.

### Setting Up Environment Variables

Create a .env file in the root directory of your project.
Add the following lines, replacing the placeholders with your actual API key and database ID:

```bash
NOTION_API_KEY = <Your_Notion_API_Key>
NOTION_DATABASE_ID = <Your_Notion_Database_ID>
```

And for github repository details:

```bash
GITHUB_OWNER = <GITHUB_OWNER>
GITHUB_REPO = <YOUR_GITHUB_REPO_NAME>
GITHUB_PATH = <YOU_GITHUB_REPO_FILEPATH>
```

## Project Customization

- This service is set to fetch and show openings that contain **"Software"** keyword in the role field.
- It shows internship listing from **January 2024 till today**.
- After cloning the project on your local machine, you can dive into the code to understand its structure and customize it according to your needs.
- Whether you're looking to adjust the filtering logic or expand the functionality, the project is designed to be flexible for further development.

## Contributing

We welcome contributions to this project! Please feel free to fork the repository, make your changes, and submit a pull request.
For major changes, please open an issue first to discuss what you would like to change.

## Support

If you find this project useful, please consider giving it a star on GitHub. This helps increase its visibility and shows support for the work that has gone into making it. Additionally, if you appreciate the internship listings curated by the [SimplifyJobs/Summer2024-Internships](https://github.com/SimplifyJobs/Summer2024-Internships) repository, don't forget to star their project as well. Your support makes a big difference!

Thank you for taking the time to explore our project, and we hope it serves you well in your search for exciting internship opportunities.
