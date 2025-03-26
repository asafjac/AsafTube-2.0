import React, { FC } from "react";
import { MainPageProps } from "./types.ts";
import Carousel from "../../components/carousel";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../../utils/queries.ts";
import { queryKeys } from "../../utils/consts.ts";
import { UploadBtn } from "../../components/uploadBtn/UploadBtn.tsx";

export const MainPage: FC<MainPageProps> = () => {
  const { data: videos, isLoading } = useQuery({
    queryKey: queryKeys.getVideos,
    queryFn: getVideos,
  });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : videos ? (
        <Carousel thumbnails={videos} />
      ) : (
        <div>Something went wrong</div>
      )}
      <UploadBtn />
    </>
  );
};
