 import React, { Fragment, useState, useEffect } from "react";
 import Post from "../Components/Post";
 import { Button } from "reactstrap";
 import { useHistory } from "react-router-dom";
 import routes from "../routes/routes";
 import ErrorBoundary from "../Components/ErrorBoundary";
 import '../styles.css';
 import 'bootstrap/dist/css/bootstrap.min.css';

 const Home = () => {
   const [posts, setPosts] = useState([]);
   const history = useHistory();
 
   useEffect(() => {
     fetch("https://pzgjk.sse.codesandbox.io/posts")
       .then(response => response.json())
       .then(data => {
         setPosts(data.posts);
       })
       .catch(console.error);
   }, []);
 
   return (
     <Fragment>
       {posts.map((post, postIndex) => {
         const onReadMore = () => {
           history.push(routes.post.replace(":id", post._id));
         };
 
         return (
           <Fragment key={postIndex}>
             <ErrorBoundary>  
               <Post
                 title={post.title}
                 author={post.author}
                 content={post.content}
                 isOnlySummary
               />
             </ErrorBoundary>
             <div className={"container"}>
               <Button onClick={onReadMore} className="button">
                 Read More
               </Button>
             </div>
           </Fragment>
         );
       })}
     </Fragment>
   );
 };
 
 export default Home;