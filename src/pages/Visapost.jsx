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


export const Visapost=()=>{
  //const { posts } = useAuth();
   const { posts, getPosts } = useAuth(); // Assuming you have a fetchPosts function to fetch posts
  // const { user } = useAuth();
  const { authorizationToken } = useAuth();
  useEffect(() => {
    getPosts(); // Fetch posts when the component mounts
}, []);
      if (!Array.isArray(posts) || posts.length === 0) {
          return <div>No posts available.</div>;
      }
    const postdetails = posts.filter(post => post.about === 'Visa');
   
  return (
    <div>      
    {postdetails.map((post, index) => (
      
    <Card sx={{ width:'50%',margin:"auto",mt:2,paddingRight:'5px',boxshadow:'5px 5px 10px #ccc' }}>
       <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             {post.user && post.user.username ? post.user.username[0].toUpperCase() : "U"}
          </Avatar>
        }
        title={post.user && post.user.username ? post.user.username : "Unknown"} // Access the username property of the populated user object // Check if user object and username exist
       
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

