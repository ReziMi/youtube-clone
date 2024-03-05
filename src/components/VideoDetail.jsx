import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if (!videoDetail?.snippet) return '...Loading';


  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sx={{ paddingLeft: { xs: 2, md: 4 } }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
          <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Box sx={{ color: "#fff" }} p={2}>
            <Link to={`/channel/${channelId}`}>
              <Typography variant="subtitle1" color="#fff">
                {channelTitle}
                <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
              </Typography>
            </Link>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(viewCount).toLocaleString()} views
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(likeCount).toLocaleString()} likes
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box p={2}>
            <Videos videos={videos} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoDetail;
