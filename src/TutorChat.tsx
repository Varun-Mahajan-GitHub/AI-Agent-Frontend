import axios from "axios";
import styled from "styled-components";
import { useState } from "react";

const ChatContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div<{ isUser: boolean }>`
  background: ${(props) => (props.isUser ? "#007bff" : "#e9ecef")};
  color: ${(props) => (props.isUser ? "#fff" : "#333")};
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
  margin: 8px 0;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

// Define chat message structure
interface ChatMessage {
  text: string;
  isUser: boolean;
}

const TutorChat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;

    // Add user's question to chat history
    setChatHistory((prevHistory) => [...prevHistory, { text: question, isUser: true }]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/ask", { question });

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: response.data.response, isUser: false },
      ]);
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: "Error fetching response", isUser: false },
      ]);
    } finally {
      setLoading(false);
      setQuestion(""); // Clear input field
    }
  };

  return (
    <ChatContainer>
      <h2>AI Study Tutor</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {chatHistory.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </div>
      {loading && <p>Thinking...</p>}
      <InputContainer>
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <Button onClick={handleAsk} disabled={loading}>
          Ask
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default TutorChat;
