import React, { useEffect } from 'react';
import { useAuth } from "../store/auth";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import { CardActionArea } from '@mui/material';

function Myposts() {
  const { myposts, getMyPosts ,isLoading,username} = useAuth();

  useEffect(() => {
    getMyPosts(); // Fetch posts when the component mounts
  }, []);

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (!Array.isArray(myposts) || myposts.length === 0) {
      return <div style={{height:'100%',width:'100%',width: '50%', margin: "auto", mt: 2, padding:'5px'}}>No posts posted yet.</div>;
  }

  return (
    <div  style={{height:'100%',width:'100%'}}>
    {myposts.map((post, index) => (
      <Card key={index} sx={{ width: '50%',  margin: "auto", mt: 2, padding:'5px', boxShadow: '5px 5px 10px #ccc' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
               {username ?username[0].toUpperCase() : "U"}
            </Avatar>
          }
          title={username ? username : "Unknown"}
          subheader={post.createdAt}
        />
        <CardActionArea>
          <CardMedia
            component="img"
            width="1000"
            image={post.photo}
            alt="photo"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </div>
  );
}

export default Myposts;
