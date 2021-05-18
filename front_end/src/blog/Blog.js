import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Dashboard from './dashboard/Dashboard';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import config from 'react-global-configuration';


const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Send money to your loved ones!',
  description:
    "Multiple lives can be saved in this pandemic, your 1$ can make difference.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'See how!',
};

const featuredPosts = [
  {
    title: 'Refer and Earn',
    date: 'Updated February, 12 2021',
    description:
      'Refer your friend and both can earn upto 500 to 1000$ each. Hurry!',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Help Victims of Coronavirus Pandemic',
    //date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

export default function Blog(props) {

  let loginStatus;
  let userId;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const login = urlParams.get('login')
  if(login === null){
     loginStatus = config.get('loginStatus');
  }
  else{
    loginStatus = login;
    userId = urlParams.get('userid')
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="" sections={sections} loginStatus={loginStatus}/>
        <main>
          {!loginStatus ? (
            <div><MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid> </div>
          ):(<Dashboard  userId={userId}/>)}
        </main>
      </Container>
      <Footer title="" description="remitEasy! Always ahead" />
    </React.Fragment>
  );
}