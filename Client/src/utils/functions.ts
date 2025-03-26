export const getLastDataOfEventStream = (eventStream: string): string => {
  const lines = eventStream.match(/data: (.+)/g);
  const lastLine = lines?.[lines.length - 1];

  const data = lastLine?.replace("data: ", "");

  return data || "";
};
