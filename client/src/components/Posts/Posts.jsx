import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";


const Posts = () => {
 
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

 
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if(!posts) return 'No Posts';

  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">

      {posts.length === 0 && 
      <span style={{margin:"0 auto"}}>No posts added yet!</span>
      } 
      {loading
        ? <Loader/>
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
