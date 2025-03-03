import React, { useState } from "react";

export default function MultipleOpen() {
  const [urls, setUrls] = useState("");

  const openTabs = () => {
    // Split the input by spaces or newlines
    const urlArray = urls.split(/\s+/);

    // Iterate over the array and open each URL in a new tab
    urlArray.forEach((url) => {
      if (url.trim() !== "") {
        // Check if URL starts with http or https
        const formattedUrl = url.startsWith("http") ? url : `http://${url}`;
        try {
          new URL(formattedUrl); // Validate URL
          window.open(formattedUrl, "_blank");
        } catch (error) {
          console.error(`Invalid URL: ${formattedUrl}`);
        }
      }
    });
  };

  return (
    <div>
      <h3>Open Multiple Tabs</h3>
      <textarea
        placeholder="Enter URLs separated by space or newline"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        rows="4"
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={openTabs} style={{ padding: "10px 20px" }}>
        Open URLs
      </button>
    </div>
  );
}
