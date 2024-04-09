import moment from "moment";

export async function mapInternshipToNotionProperties(internship) {
  return {
    Company: {
      title: [
        {
          text: {
            content: internship.Company === "↳" ? "" : internship.Company,
          },
          // plain_text: internship.Company === "↳" ? null : internship.Company,
        },
      ],
    },
    Stage: {
      status: {
        name: "Ready to apply",
        color: "default",
      },
    },
    Citizenship: {
      rich_text: [
        {
          text: {
            content: citizenshipFlag(internship.Role),
          },
        },
      ],
    },
    Position: {
      multi_select: [
        { name: internship.Role }, // Wrap the string in an array
      ],
    },
    Location: {
      rich_text: [
        {
          text: {
            content: internship.Location,
          },
        },
      ],
    },
    "Posting URL": {
      url:
        internship["Application/Link"] && internship["Application/Link"].length
          ? internship["Application/Link"][0]
          : null,
    },
    "Posting Date": {
      date: {
        start: internship["Date Posted"],
      },
    },
    // Add other properties as needed
  };
}

const citizenshipFlag = (role) => {
  let statusText = "";

  if (role.includes("🇺🇸")) {
    statusText = "Requires U.S. Citizenship";
  } else if (role.includes("🛂")) {
    statusText = "No sponsorship 🛂";
  } else {
    // Default case if no symbols are present
    statusText = "";
  }

  return statusText;
};
