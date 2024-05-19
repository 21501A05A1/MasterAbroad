import React from 'react';
import { useAuth } from "../store/auth";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import { CardActionArea } from '@mui/material';

function Scholarships() {
  const { posts } = useAuth();
  // const { user } = useAuth();
  // const { authorizationToken } = useAuth();
      if (!Array.isArray(posts) || posts.length === 0) {
          return <div>No posts available.</div>;
      }
    const postdetails = posts.filter(post => post.about === 'Scholarships');
  return (
    <div style={{ backgroundSize: 'cover',height:'100%',width:'100%', backgroundPosition: 'center' }}>
      
    {postdetails.map((post, index) => (
      
    <Card sx={{ width:'50%',margin:"auto",mt:2,padding:2,boxshadow:'5px 5px 10px #ccc' }}>
       <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.user ? post.user.username[0] : "U"}
          </Avatar>
        }
        title={post.user ? post.user.username : "Unknown"} // Access the username property of the populated user object // Check if user object and username exist
       
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
  )
}

export default Scholarships




