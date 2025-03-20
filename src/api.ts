const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const askQuestion = async (question: string) => {
  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response; // Extracting response message from API
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return "An error occurred while processing your request.";
  }
};
