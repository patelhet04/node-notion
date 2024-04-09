import { unified } from "unified";
import markdown from "remark-parse";
import gfm from "remark-gfm";
import { visit } from "unist-util-visit";
import moment from "moment";

export function exportMarkDownTable(content) {
  const tableStartMarker =
    "<!-- Please leave a one line gap between this and the table TABLE_START (DO NOT CHANGE THIS LINE) -->";
  const startIndex = content.indexOf(tableStartMarker);

  if (startIndex === -1) {
    console.error("Table start marker not found in the content.");
    return;
  }

  // Extract the table content
  const tableContent = content
    .substring(startIndex + tableStartMarker.length)
    .trim();

  return tableContent;
}

export function parseMarkdownTable(tableContent) {
  const processor = unified().use(markdown).use(gfm);
  const ast = processor.parse(tableContent);

  let headers = [];
  const data = [];

  visit(ast, "table", (node) => {
    // Extract headers
    headers = node.children[0].children.map((headerCell) => {
      return headerCell.children[0].value;
    });
    // console.log(node.children.slice(1)[0].children[0].children[0].);
    // Extract row data
    node.children.slice(1).forEach((row) => {
      const rowData = {};
      row.children.forEach((cell, index) => {
        if (headers[index] === "Application/Link") {
          // For 'Application/Link', preserve the HTML
          const htmlContent = extractHTML(cell);
          rowData[headers[index]] = extractHrefLinks(htmlContent).split(" ");
        } else {
          // For other columns, extract plain text
          rowData[headers[index]] = extractText(cell);
        }
      });
      data.push(rowData);
    });
  });
  return filterListingsFromDate(data);
}
function extractText(node) {
  if (node.type === "text") {
    return node.value;
  }

  let text = "";
  if (node.type === "link") {
    // Extract text from the link's children
    node.children.forEach((child) => {
      text += extractText(child); // Recursive call to process child nodes
    });
  } else if (node.children) {
    // Process other types of nodes that have children
    node.children.forEach((child) => {
      text += extractText(child);
    });
  }

  return text;
}
function extractHTML(node) {
  if (node.type === "html") {
    return node.value;
  }

  let htmlContent = "";
  if (node.children) {
    node.children.forEach((child) => {
      htmlContent += extractHTML(child);
    });
  }

  return htmlContent;
}

function extractHrefLinks(htmlContent) {
  const hrefRegex = /href="([^"]*)"/g;
  let hrefs = [];
  let match;

  while ((match = hrefRegex.exec(htmlContent)) !== null) {
    hrefs.push(match[1]);
  }

  return hrefs.join(" "); // Join multiple hrefs with a space
}

function filterListingsFromDate(listings) {
  console.log(listings[0]);
  const formattedListings = [];

  for (const listing of listings) {
    const dateStr = listing["Date Posted"];

    // Filter by role
    if (!listing["Role"].includes("Software")) {
      continue;
    }

    // Check if there's at least one non-empty application link
    if (!listing["Application/Link"].some((link) => link.trim() !== "")) {
      continue;
    }

    // Stop processing if "Dec" is encountered
    if (dateStr.includes("Dec")) {
      break;
    }

    // Parse and format the date
    const postDate = moment(`${dateStr} 2024`, "MMM DD YYYY");
    listing["Date Posted"] = postDate.format("YYYY-MM-DD");

    formattedListings.push(listing);
  }

  return formattedListings;
}
