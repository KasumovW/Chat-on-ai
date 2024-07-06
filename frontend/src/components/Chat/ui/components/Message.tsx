import { Box, Avatar, Typography } from "@mui/material";
import Markdown from "markdown-to-jsx";
import "./markdownStyles.css";
import { useEffect, useState } from "react";
import { IMessage } from "hooks/useMessages";

interface MessageProps {
  messageProps: IMessage;
  time: string;
  sender: string;
  isUser: boolean;
  texting?: boolean;
}

const Message = ({
  messageProps,
  time,
  sender,
  isUser,
  texting = false,
}: MessageProps) => {
  const { message } = messageProps;
  const propsText = typeof message === 'string' ? message : message.choices[0].message.content;
  const sources = typeof message !== 'string' ? message.choices[0].sources : [];
  const [text, setText] = useState(isUser ? propsText : propsText.slice(0, 5));
  
  useEffect(() => {
    if (isUser === false) {
      let i = 1;
      const interval = setInterval(() => {
        setText(() => {
          const newText = propsText.slice(0, i + 1);
          if (propsText.length <= newText.length) {
            clearInterval(interval);
          }
          i++;
          return newText;
        });
      }, 20);
    }
  }, [isUser, propsText]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        mb: 2,
      }}
    >
      {!isUser && (
        <Avatar
          src="/path/to/avatar.jpg"
          alt="Avatar"
          sx={{ width: 40, height: 40, mr: 1 }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
        }}
      >
        {!isUser && (
          <Typography variant="caption" sx={{ mb: 0.5 }}>
            {sender}
          </Typography>
        )}
        <Box
          sx={{
            backgroundColor: isUser ? "#07f" : "#e5f3ff",
            color: isUser ? "#fff" : "#000",
            p: 1,
            borderRadius: isUser ? 2 : 4,
            maxWidth: "95%",
          }}
        >
          {texting ? (
            <div className="loader"></div>
          ) : isUser ? (
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "pre-wrap",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: text.replace(/(\r\n|\n|\r)/gm, "<br>"),
                }}
              />
            </Typography>
          ) : (
            <Markdown className="markdown-body">{text}</Markdown>
          )}
        </Box>
        {propsText.length <= text.length && sources.length > 0 && (
          <Box
            sx={{
              mt: 1,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              p: 1,
              maxWidth: "95%",
            }}
          >
            <Markdown className="markdown-body">
              Источники:
            </Markdown>
            <ul>
              {sources.map((source, index) => (
                <li key={index}>
                  <Markdown className="markdown-body">
                    {source.document.doc_metadata.original_text}
                  </Markdown>
                </li>
              ))}
            </ul>
          </Box>
        )}
        <Typography variant="caption" sx={{ mt: 0.5, color: "gray" }}>
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;